import { sendEmail } from "../config/nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmails {
    static sendConfirmationEmail = async (user: IEmail) => {
        const url = `https://intelligtest.com/auth/confirm-account`;
        await sendEmail({
            to: user.email,
            subject: "IntelligTest - Confirm your account",
            text: `Hello ${user.name}, confirm your account here: ${url}\nCode: ${user.token}`,
            html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Confirm your account</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hello ${user.name}, thank you for registering.
                To activate it, click this button:
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Confirm account
              </a>
              <p style="color:#4B5563;font-size:16px;margin-top:24px;">
                Your verification code: <strong style="color:#1F2937;">${user.token}</strong>
              </p>
              <p style="color:#9CA3AF;font-size:12px;">
                This code expires in 10 minutes.
              </p>
            </div>
          </body>
        </html>
      `,
        });
    };

    static sendPasswordResetToken = async (user: IEmail) => {
        const url = `https://intelligtest.com/auth/new-password`;
        await sendEmail({
            to: user.email,
            subject: "IntelligTest - Reset your password",
            text: `Hello ${user.name}, reset your password here: ${url}\nCode: ${user.token}`,
            html: `
        <html>
          <body style="margin:0;padding:0;background:#F3F4F6;">
            <div style="
              max-width:600px;margin:40px auto;padding:24px;
              background:#fff;border-radius:8px;font-family:Arial,sans-serif;
            ">
              <h2 style="color:#1F2937;font-size:24px;">Reset password</h2>
              <p style="color:#4B5563;font-size:16px;">
                Hello ${user.name}, click the button to continue:
              </p>
              <a href="${url}" style="
                display:inline-block;background:#2563EB;color:#fff;
                text-decoration:none;font-weight:600;
                padding:12px 24px;border-radius:6px;
              ">
                Reset password
              </a>
              <p style="color:#4B5563;font-size:16px;margin-top:24px;">
                Your code: <strong style="color:#1F2937;">${user.token}</strong>
              </p>
              <p style="color:#9CA3AF;font-size:12px;">
                Expires in 10 minutes.
              </p>
            </div>
          </body>
        </html>
      `,
        });
    };
}