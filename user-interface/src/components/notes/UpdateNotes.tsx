import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getNotes, updateNotes } from "../../api/NotesApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {useNavigate} from "react-router";

export default function UpdateNotes() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useQuery({
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

    const { mutate} = useMutation({
        mutationFn: () =>
            updateNotes(sectionId!, data!._id, editedNotes),
        onError: (err: any) => {
            toast.error(err.message, { duration: 7000 });
        },
        onSuccess: () => {
            toast.success("Notes updated successfully", { duration: 7000 });
            navigate(`/sections/${sectionId}/generate-test`);
        },
    });

    if (isLoading) return <div>Loading</div>;
    if (isError || !data) return <p>Error loading note</p>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Edit Extracted Note
            </h2>

            <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={() => mutate()}
                className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
                Submit Notes
            </button>
        </div>
    );
}
