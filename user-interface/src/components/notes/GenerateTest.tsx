import {useMutation, useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {evaluateTest, generateTest} from "../../api/TestApi.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import ErrorMessage from "../auth/ErrorMessage.tsx";
import {useState} from "react";
import type {GeneratedTest} from "../../types/Test.ts";
import type {EvaluatePayload} from "../../types/Test.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import type {EvaluateTestResult} from "../../types/Test.ts";


export default function GenerateTest() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery<GeneratedTest>({
        queryKey: ["test", sectionId],
        queryFn: () => generateTest(sectionId!),
        enabled: Boolean(sectionId),
        refetchOnWindowFocus: false,
    });

    const [strictMode, setStrictMode] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Record<`answer_${number}`, string>>();

    const mutation = useMutation<
        EvaluateTestResult,
        Error,
        EvaluatePayload
    >({
        mutationFn: payload => evaluateTest(sectionId!, payload),
        onError: err => toast.error(err.message, { duration: 7000 }),
        onSuccess: result => {
            toast.success("Test evaluated successfully", { duration: 2000 });
            navigate(`/sections/${sectionId}/evaluate-test`, {
                state: result,
            });
        },
    });

    const onSubmit: SubmitHandler<Record<string, string>> = values => {
        const payload: EvaluatePayload = {
            strict: strictMode.toString(),
            ...values,
        };
        mutation.mutate(payload);
    };

    if (isLoading) return <div>Loading…</div>;
    if (isError || !data) return <p>Error loading test</p>;

    if (data) return (
       <form className="p-4 max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
           <div className="flex items-center space-x-2">
               <label className="font-medium">Strict mode:</label>
               <button
                   type="button"
                   onClick={() => setStrictMode((prev) => !prev)}
                   className={`px-3 py-1 rounded-lg ${
                       strictMode ? "bg-green-600 text-white" : "bg-gray-300"
                   }`}
               >
                   {strictMode ? "ON" : "OFF"}
               </button>
           </div>

           {data.questions.map((question, index) => {
               const fieldName = `answer_${index}` as const;
               return (
                   <div key={index} className="space-y-2">
                       <p className="font-medium">{`${index + 1}. ${question}`}</p>
                       <input
                           type="text"
                           placeholder=" "
                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           {...register(fieldName, {
                               required: "Answer the question",
                           })}
                       />
                       {errors[fieldName] && (
                           <ErrorMessage>{errors[fieldName]?.message}</ErrorMessage>
                       )}
                   </div>
               );
           })}
           <button
               type="submit"
               className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
           >
            Submit Test
           </button>
       </form>
    );
}

