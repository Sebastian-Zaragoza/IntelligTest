import { useState, useRef, useEffect, type DragEvent, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadNote } from "../../api/NotesApi.ts";
import { useNavigate } from "react-router-dom";
import { CloudArrowUpIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Lottie from "lottie-react";

export default function UploadNotes() {
    const navigate = useNavigate();
    const { sectionId } = useParams<{ sectionId: string }>();
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [animationData, setAnimationData] = useState<object | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('/resources/Material wave loading.json')
            .then(r => r.json())
            .then(setAnimationData)
            .catch(console.error);
    }, []);

    const { mutate } = useMutation({
        mutationFn: ({ sectionId, file }: { sectionId: string; file: File }) =>
            uploadNote(sectionId, file),
        onError: (error) => {
            setLoading(false);
            toast.error(error.message.toString(), { duration: 7000 });
        },
        onSuccess: () => {
            toast.success("Read the notes extracted and update it");
            setFile(null);
            setLoading(false);
            navigate(`/sections/${sectionId}/notes`);
        },
    });

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
        mutate({ sectionId, file });
    };

    return (
        <>
            {/* Loading overlay — covers the entire viewport until extraction completes */}
            {loading && animationData && (
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
                        Extracting your notes
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        This may take a few seconds
                    </p>
                </div>
            )}

            {/* Page content */}
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <div className="w-full max-w-md space-y-6">

                    {/* Title */}
                    <div className="text-center space-y-1">
                        <h1
                            className="text-3xl font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Upload Photo
                        </h1>
                        <p className="text-sm text-gray-400">
                            Drop an image of your notes to extract the text automatically
                        </p>
                    </div>

                    {/* Drop zone with camera-upload.jpg as background */}
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => inputRef.current?.click()}
                        className={`relative h-56 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-all duration-200 ${
                            dragActive
                                ? 'border-white/90 scale-[1.01]'
                                : 'border-white/40 hover:border-white/70'
                        }`}
                        style={{
                            backgroundImage: "url('/resources/camera-upload.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Dark overlay */}
                        <div className={`absolute inset-0 transition-colors duration-200 ${
                            dragActive ? 'bg-black/60' : 'bg-black/50'
                        }`} />

                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            onChange={onChange}
                            className="hidden"
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
                            {file ? (
                                <>
                                    <CheckCircleIcon className="w-10 h-10 text-emerald-400" />
                                    <p className="text-white text-sm font-medium break-all">
                                        {file.name}
                                    </p>
                                    <p className="text-white/60 text-xs">
                                        Click to change file
                                    </p>
                                </>
                            ) : (
                                <>
                                    <CloudArrowUpIcon className="w-10 h-10 text-white/80" />
                                    <p className="text-white text-sm">
                                        Drop your file here, or{' '}
                                        <span className="underline underline-offset-2">browse</span>
                                    </p>
                                    <p className="text-white/50 text-xs">
                                        Supports: JPG, PNG
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Upload button */}
                    <button
                        onClick={onClickUpload}
                        disabled={!file || loading}
                        className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Uploading' : 'Upload Image'}
                    </button>

                    {message && (
                        <p className="text-center text-sm text-gray-400">{message}</p>
                    )}
                </div>
            </div>
        </>
    );
}
