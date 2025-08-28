import api from "../lib/axios";
import {isAxiosError} from "axios";
import {
    type EvaluatePayload,
    rawEvaluateTestSchema,
    evaluateTestSchema,
    type EvaluateTestResult,
    generatedTestSchema,
} from "../types/Test.ts";

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
        throw new Error("Error occurred while test server generating test");
    }
}

export async function evaluateTest(
    sectionId: string,
    payload: EvaluatePayload
): Promise<EvaluateTestResult> {
    try {
        const { data } = await api.post(`/api/test/${sectionId}/evaluate-test`, payload);
        const inner = (data as any).response;
        if (!inner) {
            throw new Error("Missing .response in evaluate-test result");
        }
        const rawParsed = rawEvaluateTestSchema.parse(inner);
        const { score, ...feedbacks } = rawParsed;

        const test = Object.entries(feedbacks)
            .filter(([k]) => k.startsWith("feedback_"))
            .sort((a, b) => {
                const ia = parseInt(a[0].split("_")[1], 10);
                const ib = parseInt(b[0].split("_")[1], 10);
                return ia - ib;
            })
            .map(([, v]) => v);
        console.log(test)
        return evaluateTestSchema.parse({ score, test });
    }catch(err){
    isAxiosError(err) && console.error(isAxiosError(err));
    throw new Error("Error occurred while test server generating test");
    }
}

export async function getTest(sectionId: string) {
    try {
        const { data } = await api.get(`/api/test/${sectionId}/test`);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) {
            return null;
        }
        throw new Error("Error occurred while fetching test");
    }
}