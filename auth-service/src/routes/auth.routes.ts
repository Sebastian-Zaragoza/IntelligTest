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

export default router;