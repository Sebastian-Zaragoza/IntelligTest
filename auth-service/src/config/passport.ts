import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";
import User from "../models/user.model";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "https://intelligtest.com/api/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(new Error("No email returned from Google"), undefined);
                }

                // Try to find by googleId first, then by email
                let user = await User.findOne({
                    $or: [{ googleId: profile.id }, { email }],
                });

                if (!user) {
                    // New user — create account, auto-confirmed
                    user = new User({
                        name: profile.displayName,
                        email,
                        googleId: profile.id,
                        password: crypto.randomBytes(32).toString("hex"),
                        confirmPassword: true,
                    });
                    await user.save();
                } else if (!user.googleId) {
                    // Existing email/password user logging in with Google for the first time
                    user.googleId = profile.id;
                    user.confirmPassword = true;
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                return done(err as Error, undefined);
            }
        }
    )
);

export default passport;
