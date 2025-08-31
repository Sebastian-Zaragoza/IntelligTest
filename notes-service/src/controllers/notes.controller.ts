import {Request, Response} from 'express';
import axios from "axios";
import Note from "../models/notes.model";
import fs from "fs";
import FormData from "form-data";

interface ExtractTextResponse {
    notes: string;
    id: string;
}

const sendToExtractTextService = async (imagePath: string) => {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));
    const response = await axios.post<ExtractTextResponse>("http://extracttext-service:5000/extract", formData, {
        headers: formData.getHeaders()
    })
    return response.data;
}

export const uploadNotes = async (req: Request, res: Response) => {
    const imagePath = req.file?.path;
    const owner = req.headers["x-user-id"];
    const section = req.params.sectionId;

    if(!imagePath || !owner || !section){
        res.status(400).send({error: "Missing data"})
        return
    }
    try {
        const testVerify = await axios.get(`http://test-service:4003/api/test/${section}/test`, {
            headers: { "x-user-id": owner, Authorization: owner },
            timeout: 5000
        });
        if (testVerify.status === 200) {
            await axios.delete(`http://test-service:4003/api/test/${section}/test`, {
                headers: { "x-user-id": owner, Authorization: owner },
                timeout: 3000
            });
        }
    } catch (error: any) {
        if (error.response?.status !== 404 && error.code !== 'ECONNABORTED') {
            throw error;
        }
    }
    try{
        const previous_note = await Note.findOne({section})
        if (previous_note){
            await previous_note.deleteOne();
        }
        const response = await sendToExtractTextService(imagePath);
        const notes = response.notes;
        const newNote = new Note({
            notes,
            section,
            owner
        })
        await newNote.save();
        await axios.put(`http://section-service:4000/api/sections/${section}/update-section-note`, {note_id: newNote.id}, {
            headers: {
                "x-user-id": owner,
                Authorization: owner,
            },
        })
        res.status(201).json({message: 'Note added successfully', note: newNote});
    }catch(error){
        res.status(500).json({error:"Image upload failed"});
    }
}

export const getNote = async (req: Request, res: Response) => {
    try{
        const section = req.params.sectionId;
        if(!section){
            res.status(404).send({error: "Notes not found"})
            return
        }
        const notes = await Note.findOne({section})
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json({error:"Something went wrong"});
    }
}

export const updateNote = async (req: Request, res: Response) => {
    try{
        const note_id = req.params.noteId;
        const notes = req.body.notes;
        if(!note_id){
            res.status(404).send({error: "Notes are empty"})
            return
        }
        const previous_note = await Note.findById(note_id)
        if(!previous_note){
            res.status(404).send({error:"Notes not found"})
            return
        }
        previous_note.id = note_id;
        previous_note.notes = notes;
        await previous_note.save();
        res.status(200).json("Notes updated successfully");
    }catch (error){
        res.status(500).json({error:"Something went wrong"});
    }
}

export const deleteNote = async (req: Request, res: Response) => {
   try{
       const section = req.params.sectionId;
       if(!section){
           res.status(404).send({error: "Section is empty"})
           return
       }
       const note = await Note.findOne({section})
       if(note){
           await note.deleteOne();
           res.status(200).json("Note deleted successfully")
       }
       res.status(200)
   }catch(error){
       res.status(500).json({error:"Something went wrong"})
   }
}