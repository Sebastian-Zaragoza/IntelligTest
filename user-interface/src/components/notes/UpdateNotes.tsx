import {useQuery} from "@tanstack/react-query";
import {getNotes} from "../../api/NotesApi.ts";
import {useParams} from "react-router-dom";

export default function UpdateNotes() {
    const {sectionId} = useParams<{ sectionId: string}>()

    const {data,isLoading, isError} = useQuery({
        queryKey: ['notes', sectionId],
        queryFn: ()=> getNotes(sectionId!),
        enabled: Boolean(sectionId)
    })
    if (isLoading || !data) {
        return <div>Loading…</div>;
    }
    const note = data;
    if (isError)   return <p>Error loading note</p>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="border rounded p-4 mb-4 shadow">
                {note.notes}
            </div>
            <button className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
                Submit Notes
            </button>
        </div>
    );
}
