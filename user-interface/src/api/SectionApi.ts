import api from "../lib/axios.ts";
import {isAxiosError} from "axios";
import {type Section, sectionSchema, sectionViewSchema} from "../types/Section.ts";
import type {SectionFormData} from "../types/Section.ts";

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

export async function getSectionById(id: Section["_id"]){
    try{
        const {data} = await api.get(`/api/sections/${id}`)
        const response = sectionSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    }catch(err){
        if(isAxiosError(err) && err.response){
            throw new Error(err.response.data.error)
        }
    }
}

export async function createSection(formData: SectionFormData){
    try{
        const {data} = await api.post('/api/sections', formData);
        return data;
    }catch(err){
        if(isAxiosError(err) && err.response){
            throw new Error(err.response.data.error)
        }
    }
}

type updateSectionFormData = {
    formData: SectionFormData;
    id: Section["_id"];
}

export async function updateSection({formData, id}: updateSectionFormData){
    try{
        const {data} = await api.put(`/api/sections/${id}`, formData);
        return data;
    }catch(err){
        if(isAxiosError(err) && err.response){
            throw new Error(err.response.data.error)
        }
    }
}

export async function deleteSection(id: Section["_id"]){
    try{
        const {data} = await api.delete<string>(`/api/sections/${id}`);
        return data;
    }catch(err){
        if(isAxiosError(err) && err.response){
            throw new Error(err.response.data.error)
        }
    }
}
