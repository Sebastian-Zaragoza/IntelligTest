import { useParams, useLocation } from "react-router-dom";
import EvaluateTest from "./EvaluateTest";
import type { EvaluateTestResult } from "../../types/Test";

export default function EvaluateTestPage() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const result = useLocation().state as EvaluateTestResult | undefined;

    if (!sectionId || !result) {
        return <p className="p-4 text-center text-red-600">Missing evaluation data.</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4 text-center">
                Results
            </h1>
            <EvaluateTest {...result} />
        </div>
    );
}
