import api from "../lib/axios";
import axios from "axios";
import {notesSchema, updateNoteResponseSchema} from "../types/Notes.ts";
import {isAxiosError} from "axios";

export async function uploadNote(
    sectionId: string,
    file: File
): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    try {
        await api.post(`/api/notes/${sectionId}/upload`, formData);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const serverMsg =
                (err.response?.data as any)?.error ??
                    "Error occurred while uploading file";
            throw new Error(serverMsg);
        }
        throw new Error("Error occurred while uploading file");
    }
}


export async function getNotes(sectionId: string){
    try {
        const {data} = await api.get(`/api/notes/${sectionId}/notes`);
        const response = notesSchema.safeParse(data);
        if (!response.success){
            throw new Error("Error occurred while getting notes");
        }
        return response.data;
    }catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.error || err.message);
        }
        throw new Error("Error occurred while getting notes");
    }
}

export async function updateNotes(sectionId: string, noteId: string, notes: string):Promise<string> {
    try{
        const {data} = await api.put<string>(`/api/notes/${sectionId}/notes/${noteId}`, {notes: notes});
        const response = updateNoteResponseSchema.safeParse(data);
        if (!response.success){
            throw new Error("Error occurred while updating note");
        }
        return response.data;
    }catch(err){
        isAxiosError(err) && console.error(isAxiosError(err));
        throw new Error("Error occurred while updating notes");
    }
}
