import type { EvaluateTestResult } from "../../types/Test";

export default function EvaluateTest({ score, test }: EvaluateTestResult) {
    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Your Score: {score}
            </h2>

            <ul className="list-disc pl-5 space-y-2">
                {test.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
