import {Response, Request} from "express";
import User, {IUser, UsersSchema} from "../models/user.model";
import {checkPassword, hashPassword} from "../utils/auth";
import {generateToken} from "../utils/token";
import Token, {IToken} from "../models/token.model";
import {AuthEmails} from "../emails/authEmails";
import {generateJWT} from "../utils/jwt";
import {userSchema} from "../types/authSchema";


type sendEmailProps = {
    user: IUser
    token: IToken
}

function sendEmail({user, token}: sendEmailProps){
    AuthEmails.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token
    })
}

function resendEmail({user, token}: sendEmailProps){
    AuthEmails.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token
    })
}

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { confirmPassword, ...userData } = req.body;
        const { email } = userData;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(409).json({ error: "User already exists" });
            return
        }

        const user = new User(userData);
        user.password = await hashPassword(req.body.password);
        const token = new Token({
            token: generateToken(),
            user: user.id,
        });
        sendEmail({ user, token });
        await Promise.allSettled([user.save(), token.save()])
        res.send("Account created. Please check your email to confirm.");
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export const confirmAccount = async (req: Request, res: Response) => {
    try {
        const {token} = req.body
        const tokenExist = await Token.findOne({token})
        if (!tokenExist) {
            const error = new Error("Token is required");
            res.status(404).json({error: error.message})
            return
        }
        const user = await User.findById(tokenExist.user)
        if (!user) {
            const error = new Error("User not found")
            res.status(404).json({error: error.message})
            return
        }
        user.confirmPassword = true
        await Promise.allSettled([user.save(), tokenExist.deleteOne()])
        res.send('Account confirmed')
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export const loginAccount = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            const error = new Error("User not found")
            res.status(404).json({error: error.message})
            return
        }
        if(!user.confirmPassword){
            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            await token.save()
            sendEmail({user, token})

            const error = new Error("Account have not been confirmed. We have sent other to your e-mail to confirm it")
            res.status(404).json({error: error.message})
            return
        }

        const passwordValid = await checkPassword(password, user.password)
        if (!passwordValid) {
            const error = new Error("Password doesn't match")
            res.status(401).json({error: error.message})
            return
        }

        const token = generateJWT({payload: user.id})
        res.send(token)
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export const requestToken = async (req: Request, res: Response) => {
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user) {
            const error = new Error('User not found')
            res.status(404).json({error: error.message})
            return
        }
        if (user.confirmPassword){
            const error = new Error('User has been confirmed')
            res.status(403).json({error: error.message})
        }

        const token = new Token()
        token.token = generateToken()
        token.user = user.id
        sendEmail({user, token})

        await token.save()
        res.send("New token has been sent to your email")
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}


export const forgetPassword = async (req: Request, res: Response) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if (!user) {
            const error = new Error("User not found")
            res.status(404).json({error: error.message})
            return
        }
        if(!user.confirmPassword){
            const error = new Error("User has not been confirmed")
            res.status(404).json({error: error.message})
            return
        }

        const token = new Token()
        token.token = generateToken()
        token.user = user.id
        await token.save()
        resendEmail({user, token})

        res.send("Check your email to reset your password")
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export const validateToken = async (req: Request, res: Response) => {
    try {
        const {token} = req.body
        const tokenExist = await Token.findOne({token})
        if (!tokenExist) {
            const error = new Error("Token not found")
            res.status(404).json({error: error.message})
            return
        }
        res.send('Token has been verified')
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    try{
        const {token} = req.params
        const tokenExist = await Token.findOne({token})
        if (!tokenExist) {
            const error = new Error("Token not found")
            res.status(404).json({error: error.message})
            return
        }
        const user = await User.findById(tokenExist.user)
        if (!user) {
            const error = new Error("User not found")
            res.status(404).json({error: error.message})
            return
        }
        user.password = await hashPassword(req.body.password)
        await Promise.allSettled([user.save(), tokenExist.deleteOne()])
        res.send('Password has been updated')
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export const userAuthenticate = async (req: Request, res: Response) => {
    try{
        const raw = req.headers["x-user-id"];
        let userId: string;
        if (Array.isArray(raw)) {
            userId = raw[0];
        } else if (typeof raw === "string") {
            userId = raw;
        } else {
            res.status(401).json({ error: "Missing header" });
            return;
        }
        const data = await User.findById(userId);
        if(!data){
            res.status(404).json({ error: "User not found" });
            return;
        }
        const response = userSchema.safeParse(data);
        if (response.success){
            res.status(200).json(response.data);
        }else{
            res.status(400).json({ error: "Invalid user data" });
        }
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
};

