import type { EvaluateTestResult } from "../../types/Test";

export default function EvaluateTest({ score, test }: EvaluateTestResult) {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
                Your Score: <span className="text-indigo-600">{score}</span>
            </h2>

            <ul className="list-disc pl-6 space-y-3">
                {test.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
