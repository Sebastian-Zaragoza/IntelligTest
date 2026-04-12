import mongoose,{Document, Schema} from "mongoose"

export interface IUser extends Document{
    name: string,
    email: string,
    password: string,
    confirmPassword: boolean,
    googleId?: string,
}

export const UsersSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique:true,
        trim: true
    },
    password:{
        type: String,
        required: false,
    },
    confirmPassword:{
        type: Boolean,
        default: false
    },
    googleId:{
        type: String,
        required: false,
        sparse: true,
    }
}, {timestamps:true})

export const User = mongoose.model<IUser>('User', UsersSchema)
export default User

