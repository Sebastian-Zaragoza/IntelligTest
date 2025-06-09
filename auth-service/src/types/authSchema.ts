import {z} from "zod";

export const userSchema = z.object({
    _id: z.preprocess(
        val => typeof val === "object" && val !== null && "toString" in val
            ? (val as any).toString()
            : val,
        z.string()
    ),
    name: z.string(),
    email: z.string().email(),
});
export type User = z.infer<typeof userSchema>