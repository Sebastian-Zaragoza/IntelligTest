import {z} from "zod";

export const notesSchema = z.object({
    _id: z.string(),
    notes: z.string(),
    section: z.string(),
    owner: z.string()
})
export const updateNoteResponseSchema = z.string();
export type Notes = z.infer<typeof notesSchema>
