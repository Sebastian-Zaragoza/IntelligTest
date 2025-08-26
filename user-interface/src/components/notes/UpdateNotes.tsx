import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getNotes, updateNotes } from "../../api/NotesApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {useNavigate} from "react-router";

export default function UpdateNotes() {
    const { sectionId } = useParams<{ sectionId: string }>();
    const navigate = useNavigate();
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


    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
                Edit Extracted Note
            </h2>

            <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                rows={6}
                className="
        w-full border border-gray-300 rounded-lg p-4
        focus:outline-none focus:ring-2 focus:ring-gray-700
        transition
      "
            />

            <button
                onClick={() => mutate()}
                className="
        w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold
        px-6 py-2 rounded-lg shadow transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
            >
                {isLoading ? 'Submitting…' : 'Submit Notes'}
            </button>
        </div>
    );

}
