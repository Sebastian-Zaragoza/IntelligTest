import api from "../lib/axios";
import {isAxiosError} from "axios";
import {generatedTestSchema} from "../types/Test.ts";

export async function generateTest(sectionId: string){
    try{
        const {data} = await api.get<unknown>(`/api/test/${sectionId}/generate-test`)
        const response = generatedTestSchema.safeParse(data);
        if (!response.success){
            throw new Error("Error occurred while generating test");
        }
        return response.data;
    }catch(err){
        isAxiosError(err) && console.error(isAxiosError(err));
        throw new Error("Error occurred while updating notes");
    }
}