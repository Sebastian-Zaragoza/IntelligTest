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
        const previous_one = await Test.findOne({sectionId: section})
        if(previous_one){
            const questions = previous_one.questions;
            const answers = previous_one.answers;
            res.status(200).send({questions: questions, answers: answers});
            return;
        }
        const {data} = await axios.get(`http://notes-service.intelligtest-namespace.svc.cluster.local:4002/api/notes/${section}/notes`, {
            headers:{
                "x-user-id": owner,
                Authorization: owner
            }
        })
        const {notes} = data;
        const test = await axios.post(`http://generatetest-service.intelligtest-namespace.svc.cluster.local:5001/api/gpt/generate`, {message: notes})
        const questionsAndAnswers: generateTestTypes[] = test.data.response;
        const questionsArray: string[] = questionsAndAnswers.map(item => item.question);
        const answersArray: string[] = questionsAndAnswers.map(item => item.answer);
        const generated_test = new Test({
            sectionId: section,
            questions: questionsArray,
            answers: answersArray
        })
        await generated_test.save();
        res.status(200).send({questions: questionsArray, answers: answersArray});
        return;
    }catch(error){
        res.status(500).json({error:"Test failed with error"});
    }
}

export const evaluateTest = async (req: Request, res: Response) => {
    try {
        const sectionId = req.params.sectionId;
        const { strict, ...userAnswers } = req.body;
        const test = await Test.findOne({sectionId});
        if (!test) {
            res.status(404).json({ error: "Test not found" });
            return;
        }
        const { questions, answers } = test;
        const testEvaluation = questions.map((question, index) => {
            const correctAnswer = answers[index];
            const answerKey = `answer_${index}`;
            const userAnswer = userAnswers[answerKey];
            return {
                question,
                answer: correctAnswer,
                user_answer: userAnswer
            };
        });
        const finalBody = {
            strict_mode: strict,
            test: testEvaluation
        };
        const results = await axios.post(`http://evaluatetest-service.intelligtest-namespace.svc.cluster.local:5002/api/gpt/evaluate`, finalBody)
        res.status(200).json(results.data);
    } catch (error) {
        res.status(500).json({ error: "Test evaluation failed" });
    }
};

export const deleteTest = async (req: Request, res: Response) => {
    try{
        const sectionId = req.params.sectionId;
        if(!sectionId){
            res.status(404).send({error: "Section is empty"})
            return
        }
        const test = await Test.findOne({sectionId})
        if(test){
            await test.deleteOne()
            res.status(200).json("Test deleted successfully")
        }
        res.status(200)
    }catch(error){
        res.status(500).json({ error: "Error deleting test" });
    }
}

export const getTestGenerated = async (req: Request, res: Response) => {
    try{
        const sectionId = req.params.sectionId;
        if (!sectionId){
            res.status(404).send({error: "Test not found"})
            return
        }
        const test = await Test.findOne({sectionId})
        res.status(200).json(test);
    }catch(error){
        res.status(500).json({ error: "Error getting test" });
    }
}