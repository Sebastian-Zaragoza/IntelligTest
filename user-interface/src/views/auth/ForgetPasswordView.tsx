import ErrorMessage from "../../components/auth/ErrorMessage.tsx";
import {Link} from "react-router";
import {useForm} from "react-hook-form";
import type {RequestNewTokenForgetPassword} from "../../types/Auth.ts";
import {useMutation} from "@tanstack/react-query";
import {forgetPassword} from "../../api/AuthApi.ts";
import {toast} from "sonner";

export default function ForgetPasswordView() {
    const initialValues: RequestNewTokenForgetPassword = {
        email: "",
    }

    const {register, handleSubmit, formState:{errors}, reset} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: forgetPassword,
        onError: (error) => {
            toast.error(error.message, {
                duration: 7000
            })
        },
        onSuccess: (data) => {
            toast.success(data, {
                duration: 7000
            })
            reset()
        }
    })

    const handleForgetPassword = (formData: RequestNewTokenForgetPassword) =>{
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
                        Reset Password
                    </h3>
                    <p className="text-sm text-gray-400">
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(handleForgetPassword)}>
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

                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Remembered your password?{' '}
                    <Link to={'/auth/login'} className="text-gray-900 font-semibold hover:underline">
                        Log in
                    </Link>
                </p>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to={'/auth/register'} className="text-gray-900 font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
}
