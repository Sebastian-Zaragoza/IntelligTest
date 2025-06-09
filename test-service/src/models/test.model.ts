import mongoose, {Document, Schema} from "mongoose";

export interface ITest extends Document {
    sectionId: string;
    questions: string[];
    answers: string[];
}

export const testSchema = new Schema({
    sectionId: {
        type: String,
        required: true,
    },
    questions: [{
        type: String,
        required: true,
    }],
    answers: [{
        type: String,
        required: true,
    }]
}, {timestamps: true});

export const Test = mongoose.model<ITest>("Test", testSchema);
export default Test;