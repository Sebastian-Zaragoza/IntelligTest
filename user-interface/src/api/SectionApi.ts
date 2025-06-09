import api from "../lib/axios.ts";
import {isAxiosError} from "axios";
import {sectionViewSchema} from "../types/Section.ts";

export async function getSections(){
    try{
        const {data} = await api.get('/api/sections')
        const response = sectionViewSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    }catch(err){
        if(isAxiosError(err) && err.response){
            throw new Error(err.response.data.error)
        }
    }
}