import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import EvaluateTest from "./EvaluateTest";
import type { EvaluateTestResult } from "../../types/Test";

export default function EvaluateTestPage() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const result = useLocation().state as EvaluateTestResult | undefined;

    if (!sectionId || !result) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-sm text-red-500">Missing evaluation data.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-4 space-y-6">

            {/* Header */}
            <div>
                <Link
                    to={`/sections/${sectionId}/generate-test`}
                    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition mb-4"
                >
                    ← Back to Test
                </Link>
                <h1
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Your Results
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                    Here's how you performed along with detailed feedback
                </p>
            </div>

            <EvaluateTest {...result} />

            {/* Return to sections */}
            <div className="text-center pt-2">
                <Link
                    to="/"
                    className="text-sm text-gray-400 hover:text-gray-700 hover:underline transition"
                >
                    Return to Sections
                </Link>
            </div>

        </div>
    );
}
