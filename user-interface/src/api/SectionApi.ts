import api from "../lib/axios.ts";
import {isAxiosError} from "axios";
import {sectionViewSchema} from "../types/Setion.ts";

export async function getSections(){
    try{
        const {data} = await api.get('/api/sections')
        const response = sectionViewSchema.safeParse(data);
        console.log(response)
        if(response.success){
            return response.data;
        }
        console.log(response.data);
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}