import  {useState, useRef, type DragEvent, type ChangeEvent} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {uploadNote} from "../../api/NotesApi.ts";
import {useNavigate} from "react-router-dom";

export default function UploadNotes() {
    const navigate = useNavigate()
    const {sectionId} = useParams<{sectionId: string}>();
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {mutate} = useMutation({
        mutationFn: ({ sectionId, file }: { sectionId: string; file: File }) =>
            uploadNote(sectionId, file),
        onError: (error) => {
            toast.error(error.message.toString(),{
                duration: 7000
            });
        },
        onSuccess: () => {
            toast.success("Read the notes extracted and update it");
            setFile(null);
            setLoading(false);
            navigate(`/sections/${sectionId}/notes`)
        }
    })

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };
    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFile(e.target.files[0]);
    };
    const onClickUpload = () => {
        if (!file || !sectionId) return;
        setLoading(true);
        setMessage(null);
        mutate({sectionId, file})
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`
        border-2 border-dashed border-gray-300 rounded-lg p-8 text-center
        transition-colors cursor-pointer
        ${dragActive ? 'bg-gray-50' : 'bg-white'}
        hover:bg-gray-50
      `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="hidden"
                />
                <p className="text-gray-600">
                    {file
                        ? `Selected: ${file.name}`
                        : 'Drag & drop or click to select an image'}
                </p>
            </div>

            <button
                onClick={onClickUpload}
                disabled={!file || loading}
                className="
        w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold
        px-6 py-2 rounded-lg shadow transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
            >
                {loading ? 'Uploading…' : 'Upload Image'}
            </button>

            {message && (
                <p className="mt-2 text-sm text-gray-500">
                    {message}
                </p>
            )}
        </div>
    );

}
