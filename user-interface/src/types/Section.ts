import {z} from "zod";

export const sectionSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    subject: z.string(),
    notes: z.string(),
    owner: z.string(),
})

export const sectionViewSchema = z.array(
    sectionSchema.pick({
        _id: true,
        name: true,
        description: true,
        subject: true,
        owner: true,
    })
)

export type Section = z.infer<typeof sectionSchema>
