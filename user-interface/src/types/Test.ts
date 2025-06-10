import {z} from "zod";

export const generatedTest = z.string();
export const generatedTestSchema = z.object({
    questions: z.array(z.string()),
    answers:  z.array(z.string())
})

export type Test = z.infer<typeof generatedTestSchema>