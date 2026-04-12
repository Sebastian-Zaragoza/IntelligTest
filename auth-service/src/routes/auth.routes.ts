import {Router} from "express";
import {param, body} from "express-validator";
import {handleInputErrors} from "../middlewares/validation";
import {
    checkPasswordUser,
    confirmAccount,
    createAccount,
    forgetPassword,
    loginAccount,
    requestToken, updatePassword, userAuthenticate, validateToken
} from "../controllers/auth.controller";
import passport from "../config/passport";
import {IUser} from "../models/user.model";
import {generateJWT} from "../utils/jwt";

const router = Router()

router.post('/create-account',
    body("name")
        .notEmpty().withMessage("Name is required"),
    body("password")
        .isLength({min:8}).withMessage("Password is short, minimum 8 characters"),
    body("confirmPassword").custom((value, {req})=>{
        if(req.body.password != value){
            throw new Error('Passwords are different')
        }
        return true
    }),
    body("email")
        .isEmail().withMessage("Email is invalidate"),
    handleInputErrors,
    createAccount
)

router.post('/confirm-account',
    body("token")
        .notEmpty().withMessage("Token is required"),
    handleInputErrors,
    confirmAccount
)

router.post('/login',
    body("email")
        .isEmail().withMessage("Email is required"),
    body("password")
        .notEmpty().withMessage("Password is required"),
    handleInputErrors,
    loginAccount
)

router.post('/request-token',
    body("email")
        .isEmail().withMessage("Email is required"),
    handleInputErrors,
    requestToken
)

router.post('/forget-password',
    body("email")
        .isEmail().withMessage("Email is required"),
    handleInputErrors,
    forgetPassword
)

router.post('/validate-token',
    body("token")
        .notEmpty().withMessage("Token is required"),
    handleInputErrors,
    validateToken
)

router.post('/update-password/:token',
    param("token")
        .isString().withMessage("Token must be a string")
        .notEmpty().withMessage("Token is required"),
    body("password")
        .isLength({min:8}).withMessage("Password is short, minimum 8 characters"),
    body("confirmPassword").custom((value, {req}) =>{
        if(req.body.password!=value){
            throw new Error("Passwords do not match")
        }
        return true
    }),
    handleInputErrors,
    updatePassword
)
router.get('/user',
    userAuthenticate
)

router.post('/check-password',
    userAuthenticate,
    body("password").notEmpty().withMessage("Password is required"),
    handleInputErrors,
    checkPasswordUser
)

// Google OAuth
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "https://intelligtest.com/auth/login?error=google_failed",
        session: false,
    }),
    (req, res) => {
        const user = req.user as IUser;
        const token = generateJWT({ payload: user.id });
        res.redirect(`https://intelligtest.com/auth/google/success?token=${token}`);
    }
);

export default router;