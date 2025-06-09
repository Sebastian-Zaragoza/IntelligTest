import {Request, Response} from "express";
import axios from "axios";
import Test from "../models/test.model";

export const generateTest = async (req: Request, res: Response) => {
    type generateTestTypes = {
        question: string;
        answer: string;
    }
    try{
        const owner = req.headers["x-user-id"];
        if (!owner){
            res.status(400).send({error: "Missing data"})
            return;
        }
        const section = req.params.sectionId;
        const {data} = await axios.get(`http://notes-service:4002/api/notes/${section}/notes`, {
            headers:{
                "x-user-id": owner,
                Authorization: owner
            }
        })
        const {notes} = data;
        const test = await axios.post(`http://generatetest-service:5001/api/gpt/generate`, {message: notes})
        const questionsAndAnswers: generateTestTypes[] = test.data.response;
        const questionsArray: string[] = questionsAndAnswers.map(item => item.question);
        const answersArray: string[] = questionsAndAnswers.map(item => item.answer);
        const generated_test = new Test({
            sectionId: section,
            questions: questionsArray,
            answers: answersArray
        })
        await generated_test.save();
        res.status(200).send('Test generated successfully');
    }catch(error){
        res.status(500).json({error:"Test failed with error"});
    }
}