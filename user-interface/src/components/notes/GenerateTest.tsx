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

    const { data, isLoading } = useQuery<GeneratedTest>({
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


    if (data) return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="
      max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8
      space-y-6
    "
        >
            <div className="flex items-center space-x-3">
                <label className="font-medium text-gray-800">Strict mode:</label>
                <button
                    type="button"
                    onClick={() => setStrictMode(prev => !prev)}
                    className={`
          px-4 py-2 rounded-md font-semibold transition
          ${strictMode
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-700'}
        `}
                >
                    {strictMode ? 'ON' : 'OFF'}
                </button>
            </div>

            {/* Questions */}
            {data.questions.map((question, idx) => {
                const name = `answer_${idx}` as const;
                return (
                    <div key={idx} className="space-y-2">
                        <p className="text-gray-900 font-medium">
                            {idx + 1}. {question}
                        </p>
                        <input
                            {...register(name, { required: 'Answer the question' })}
                            type="text"
                            className="
              w-full border border-gray-300 rounded-lg p-3
              focus:outline-none focus:ring-2 focus:ring-gray-700
              transition
            "
                            placeholder="Your answer..."
                        />
                        {errors[name] && (
                            <ErrorMessage>{errors[name]?.message}</ErrorMessage>
                        )}
                    </div>
                );
            })}

            {/* Submit */}
            <button
                type="submit"
                className="
        w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold
        px-6 py-3 rounded-lg shadow transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
            >
                {isLoading ? 'Evaluating…' : 'Submit Test'}
            </button>
        </form>
    );

}

