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
            navigate('/')
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

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to={'/auth/register'} className="text-gray-900 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}
