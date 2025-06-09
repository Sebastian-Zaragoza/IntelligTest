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
            navigate(`/${sectionId}/notes`)
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
        <div>
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                style={{
                    border: "2px dashed #aaa",
                    padding: "1rem",
                    textAlign: "center",
                    background: dragActive ? "#f0f0f0" : "#fff",
                    cursor: "pointer",
                }}
            >
                {file
                    ? `Selected: ${file.name}`
                    : "Drag and drop or click to select an image"}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    style={{ display: "none" }}
                />
            </div>

            <button
                onClick={onClickUpload}
                disabled={!file || loading}
                style={{ marginTop: "1rem" }}
            >
                {loading ? "Uploading" : "Upload image"}
            </button>

            {message && <p style={{ marginTop: "0.5rem" }}>{message}</p>}
        </div>
    );
}
