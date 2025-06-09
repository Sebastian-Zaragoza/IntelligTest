import {Request, Response} from "express";
import Section from "../models/section.model";
import axios from "axios";

export const createSection = async(req: Request, res: Response) => {
    const{name, description, subject}= req.body;
    const owner = req.headers["x-user-id"] as string;
    if (!owner) {
        res.status(401).json({ error: "Missing user ID in header" });
        return
    }
    try {
        const section = new Section({name, description, subject, owner});
        await section.save();
        res.status(201).json("Section created successfully");
    }catch(error){
        res.status(500).json({error:"Section creation failed"});
    }
}

export const getSection = async (req: Request, res: Response) => {
    try{
        const owner = req.headers["x-user-id"] as string;
        const sections = await Section.find({owner: owner})
        res.status(200).json(sections);
    }catch(error){
        res.status(500).json({error:"Something went wrong"});
    }
}

export const getSectionById = async (req: Request, res: Response) => {
    try{
        const section = await Section.findById(req.params.id)
        if(!section){
            res.status(404).json({error:"No such section"});
            return
        }
        const owner = req.headers["x-user-id"] as string;
        if(section.owner.toString() !== owner.toString()){
            res.status(403).json({ error: "Access denied" });
            return
        }
        res.status(200).json(section);
    }catch(error){
        res.status(500).json({error:"Something went wrong"});
    }
}

export const updateSection = async (req: Request, res: Response) => {
    try{
        const section = await Section.findById(req.params.id)
        if(!section){
            res.status(404).json({error:"No such section"});
            return
        }
        const owner = req.headers["x-user-id"] as string;
        if(section.owner.toString() !== owner.toString()){
            res.status(403).json({ error: "Access denied" });
            return
        }
        section.name = req.body.name;
        section.description = req.body.description;
        section.subject = req.body.subject;
        section.owner = owner
        await section.save();
        res.status(200).json("Section updated successfully");
    }catch(error){
        res.status(500).json({error:"Something went wrong"});
    }
}

export const updateSectionNote = async (req: Request, res: Response) => {
    try{
        const section = await Section.findById(req.params.id)
        if(!section){
            res.status(404).json({error:"No such section"});
            return
        }
        const owner = req.headers["x-user-id"] as string;
        if(section.owner.toString() !== owner.toString()){
            res.status(403).json({ error: "Access denied" });
            return
        }
        section.notes = req.body.note_id;
        await section.save();
        res.status(200).json("Section updated successfully");
    }catch(error){
        console.error("UPDATE SECTION ERROR:", error);
        res.status(500).json({error:"Something went wrong"});
    }
}

export const deleteSection = async (req: Request, res: Response) => {
    try{
        const section = await Section.findById(req.params.id)
        if(!section){
            res.status(404).json({error:"No such section"});
            return
        }
        const owner = req.headers["x-user-id"] as string;
        if(section.owner.toString() !== owner.toString()){
            res.status(403).json({ error: "Access denied" });
            return
        }
        await axios.delete(`http://notes-service:4002/api/notes/${req.params.id}/notes`,{
            headers: {
                "x-user-id":owner,
                Authorization: owner
            }
        })
        await axios.delete(`http://test-service:4003/api/test/${req.params.id}/test`,{
            headers: {
                "x-user-id":owner,
                Authorization: owner
            }
        })
        await Section.findByIdAndDelete(section)
        res.status(200).json("Section deleted successfully");
    }catch(error){
        res.status(500).json({error:"Something went wrong"});
    }
}