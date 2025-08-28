import mongoose, {Document, Schema} from "mongoose";

export interface ISection extends Document {
    name:string;
    description:string;
    subject:string;
    notes?:string;
    owner:string;
}

export const SectionSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    subject:{
        type: String,
        required: true,
        trim: true,
    },
    notes:{
        type: String,
        required: false,
    },
    owner:{
        type: String,
        required: true,
    }
}, {timestamps:true});

const Section = mongoose.model<ISection>("Section", SectionSchema);
export default Section;