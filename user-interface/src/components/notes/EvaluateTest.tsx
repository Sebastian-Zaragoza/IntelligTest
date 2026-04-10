import type { EvaluateTestResult } from "../../types/Test";

export default function EvaluateTest({ score, test }: EvaluateTestResult) {
    return (
        <div className="space-y-5">

            {/* Score banner */}
            <div className="bg-gray-900 rounded-xl px-6 py-8 text-center space-y-2">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                    Final Score
                </p>
                <p
                    className="text-white text-5xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {score}
                </p>
                <p className="text-white/50 text-sm">
                    Review the feedback below for each question
                </p>
            </div>

            {/* Feedback items */}
            <div className="space-y-3">
                {test.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4"
                    >
                        <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {item}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}
