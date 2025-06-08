import mongoose, {Document, Schema} from "mongoose";

export interface INote extends Document{
    notes: string;
    section: string;
    owner: string;
}

export const noteSchema = new Schema({
    notes: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export const Note = mongoose.model<INote>("Note", noteSchema);
export default Note;