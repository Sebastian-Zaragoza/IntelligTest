import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, updateNotes } from "../../api/NotesApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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

    useEffect(() => {
        if (data) {
            setEditedNotes(data.notes);
        }
    }, [data]);

    const { mutate } = useMutation({
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
                    disabled={isLoading || !editedNotes.trim()}
                    className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Submitting…' : 'Submit Notes'}
                </button>
            </div>

        </div>
    );
}
