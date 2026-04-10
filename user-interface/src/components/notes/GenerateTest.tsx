import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { evaluateTest, generateTest } from "../../api/TestApi.ts";
import { type SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../auth/ErrorMessage.tsx";
import { useState, useEffect } from "react";
import type { GeneratedTest } from "../../types/Test.ts";
import type { EvaluatePayload } from "../../types/Test.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { EvaluateTestResult } from "../../types/Test.ts";
import { Link } from "react-router-dom";

export default function GenerateTest() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const navigate = useNavigate();

    const { data } = useQuery<GeneratedTest>({
        queryKey: ["test", sectionId],
        queryFn: () => generateTest(sectionId!),
        enabled: Boolean(sectionId),
        refetchOnWindowFocus: false,
    });

    const [strictMode, setStrictMode] = useState(false);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Record<`answer_${number}`, string>>();

    useEffect(() => {
        if (data?.questions) {
            reset();
        }
    }, [JSON.stringify(data?.questions)]);

    const mutation = useMutation<EvaluateTestResult, Error, EvaluatePayload>({
        mutationFn: (payload) => evaluateTest(sectionId!, payload),
        onError: (err) => toast.error(err.message, { duration: 7000 }),
        onSuccess: (result) => {
            toast.success("Test evaluated successfully", { duration: 2000 });
            navigate(`/sections/${sectionId}/evaluate-test`, { state: result });
        },
    });

    const onSubmit: SubmitHandler<Record<string, string>> = (values) => {
        const payload: EvaluatePayload = {
            strict: strictMode.toString(),
            ...values,
        };
        mutation.mutate(payload);
    };

    if (!data) return null;

    return (
        <div className="max-w-2xl mx-auto py-4 space-y-6">

            {/* Header */}
            <div>
                <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition mb-4"
                >
                    ← Back to Sections
                </Link>
                <h1
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Your Test
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                    Answer all questions, then submit for AI evaluation
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Strict mode toggle */}
                <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Strict Mode</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Require exact answers for full marks
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setStrictMode((prev) => !prev)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            strictMode ? 'bg-gray-900' : 'bg-gray-200'
                        }`}
                        aria-pressed={strictMode}
                    >
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                strictMode ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>

                {/* Questions */}
                {data.questions.map((question, idx) => {
                    const name = `answer_${idx}` as const;
                    return (
                        <div
                            key={idx}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-5 space-y-3"
                        >
                            <div className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    {idx + 1}
                                </span>
                                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                                    {question}
                                </p>
                            </div>
                            <input
                                {...register(name, { required: 'Answer the question' })}
                                type="text"
                                placeholder="Your answer…"
                                className="block w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
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
                    disabled={mutation.isPending}
                    className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {mutation.isPending ? 'Evaluating…' : 'Submit Test'}
                </button>

            </form>
        </div>
    );
}
