import { z } from "zod";

export const generatedTestSchema = z.object({
    questions: z.array(z.string()),
    answers:   z.array(z.string()),
});
export type Test = z.infer<typeof generatedTestSchema>;
export type GeneratedTest = Test;

export type EvaluatePayload = {
    strict: string;
} & Record<`answer_${number}`, string>;

export const rawEvaluateTestSchema = z
    .object({ score: z.string() })
    .catchall(z.string());
export type RawEvaluateTest = z.infer<typeof rawEvaluateTestSchema>;

export const evaluateTestSchema = z.object({
    score: z.string(),
    test:  z.array(z.string()),
});
export type EvaluateTestResult = z.infer<typeof evaluateTestSchema>;
