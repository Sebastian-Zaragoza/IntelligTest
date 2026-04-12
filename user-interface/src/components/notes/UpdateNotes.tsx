import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, updateNotes } from "../../api/NotesApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

export default function UpdateNotes() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["notes", sectionId],
        queryFn: () => getNotes(sectionId!),
        enabled: Boolean(sectionId),
    });

    const [editedNotes, setEditedNotes] = useState<string>("");
    const [animationData, setAnimationData] = useState<object | null>(null);

    useEffect(() => {
        if (data) {
            setEditedNotes(data.notes);
        }
    }, [data]);

    useEffect(() => {
        fetch('/resources/Material wave loading.json')
            .then(r => r.json())
            .then(setAnimationData)
            .catch(console.error);
    }, []);

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateNotes(sectionId!, data!._id, editedNotes),
        onError: (err: any) => {
            toast.error(err.message, { duration: 7000 });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes", sectionId!] });
            queryClient.invalidateQueries({ queryKey: ["test", sectionId!] });
            toast.success("Notes updated successfully", { duration: 7000 });
            navigate(`/sections/${sectionId}/generate-test`);
        },
    });

    return (
        <>
            {/* Loading overlay — stays visible from Submit Notes click through test generation navigation */}
            {isPending && animationData && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        className="w-72 h-72"
                    />
                    <p
                        className="text-xl font-bold text-gray-900 mt-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Processing your notes
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Saving changes and preparing your test
                    </p>
                </div>
            )}

            <div className="max-w-2xl mx-auto py-4 space-y-6">

                {/* Header */}
                <div>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition mb-4"
                    >
                        ← Back to Sections
                    </Link>
                    <h1
                        className="text-3xl font-bold text-gray-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Edit Extracted Notes
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Review and correct the text extracted from your image before generating a test
                    </p>
                </div>

                {/* Notes textarea card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Extracted content
                    </label>
                    <textarea
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                        rows={14}
                        placeholder="Your extracted notes will appear here…"
                        className="block w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed transition"
                    />

                    <button
                        onClick={() => mutate()}
                        disabled={isLoading || isPending || !editedNotes.trim()}
                        className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Submitting' : 'Submit Notes'}
                    </button>
                </div>

            </div>
        </>
    );
}
