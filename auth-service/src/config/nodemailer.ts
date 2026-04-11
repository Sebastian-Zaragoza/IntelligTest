import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(opts: {
    to: string;
    subject: string;
    html: string;
    text?: string;
}) {
    try {
        const data = await resend.emails.send({
            from: "IntelligTest <noreply@intelligtest.com>",
            to: opts.to,
            subject: opts.subject,
            html: opts.html,
            text: opts.text || "",
        });
        console.log("Email sent via Resend");
        return data;
    } catch (error) {
        console.error("Error trying to send an email via Resend:", error);
        throw error;
    }
}