import type {UserLoginForm} from "../../types/Auth.ts";
import {useForm} from "react-hook-form";
import ErrorMessage from "../../components/auth/ErrorMessage.tsx";
import {Link, useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {loginAccount} from "../../api/AuthApi.ts";
import {toast} from "sonner";

export default function LoginUI() {
    const initialValues:UserLoginForm = {
        email: '',
        password: '',
    }

    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}, reset} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: loginAccount,
        onError: (error) =>{
            toast.error(error.message, {
                duration: 7000,
            })
        },
        onSuccess:()=>{
            reset()
            navigate('/dashboard')
        }
    })

    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <div className="flex flex-1 flex-col justify-center items-center px-10 py-8">
            <div className="w-full max-w-sm space-y-5">

                <div className="space-y-1 text-center">
                    <h3
                        className="text-3xl font-bold text-gray-900"
                        style={{fontFamily: "'Playfair Display', serif"}}
                    >
                        Welcome Back
                    </h3>
                    <p className="text-sm text-gray-400">
                        Enter your email and password to access your account
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="block w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email"
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="block w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    {/* Forgot Password / Request code row */}
                    <div className="flex justify-between items-start gap-4">
                        <Link
                            to={'/auth/forget-password'}
                            className="text-xs text-gray-500 hover:text-gray-900 hover:underline whitespace-nowrap"
                        >
                            Forgot Password
                        </Link>
                        <Link
                            to={'/auth/request-code'}
                            className="text-xs text-gray-500 hover:text-gray-900 hover:underline text-right"
                        >
                            Don't have confirmed your email? Request a new code
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition"
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <a
                    href="/api/auth/google"
                    className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign in with Google
                </a>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to={'/auth/register'} className="text-gray-900 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>

                <p className="text-center text-xs text-gray-400">
                    <Link to={'/privacy-policies'} className="hover:text-gray-600 hover:underline transition">
                        Privacy Policy
                    </Link>
                    <span className="mx-2">·</span>
                    <Link to={'/terms-of-service'} className="hover:text-gray-600 hover:underline transition">
                        Terms of Service
                    </Link>
                </p>

            </div>
        </div>
    )
}
