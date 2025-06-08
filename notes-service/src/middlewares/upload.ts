import multer from "multer";

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, "uploads/");
    },
    filename: (_req, file, callback) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        callback(null, uniqueName);
    }
})
export const upload = multer({ storage });