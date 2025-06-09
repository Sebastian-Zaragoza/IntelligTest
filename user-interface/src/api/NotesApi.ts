import api from "../lib/axios";
import axios from "axios";

export async function uploadNote(
    sectionId: string,
    file: File
): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    try {
        await api.post(`/api/notes/${sectionId}/upload`, formData);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const serverMsg =
                (err.response?.data as any)?.error ??
                    "Error occurred while uploading file";
            throw new Error(serverMsg);
        }
        throw new Error("Error occurred while uploading file");
    }
}
