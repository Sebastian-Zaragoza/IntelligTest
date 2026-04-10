import ErrorMessage from "./ErrorMessage.tsx";
import type {ConfirmToken, NewPasswordResetForm} from "../../types/Auth.ts";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {updatePasswordWithToken} from "../../api/AuthApi.ts";
import {toast} from "sonner";

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({token}: NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordResetForm = {
        password: '',
        confirmPassword: '',
    }

    const {register, handleSubmit, reset, watch, formState:{errors}} = useForm({defaultValues: initialValues})
    const password = watch('password')

    const {mutate} = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message, {
                duration: 7000,
            })
        },
        onSuccess: () => {
            reset()
            navigate('/auth/login')
        }
    })

    const handleNewPassword = (formData: NewPasswordResetForm) => {
        const data ={
            formData,
            token
        }
        console.log(data)
        mutate(data)
    }

    return (
        <div className="flex flex-1 flex-col justify-center items-center px-10 py-8">
            <div className="w-full max-w-sm space-y-5">

                <div className="space-y-1 text-center">
                    <h3
                        className="text-3xl font-bold text-gray-900"
                        style={{fontFamily: "'Playfair Display', serif"}}
                    >
                        New Password
                    </h3>
                    <p className="text-sm text-gray-400">
                        Choose a strong password for your account
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(handleNewPassword)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="block w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            {...register("confirmPassword", {
                                required: "Password confirmation is required",
                                validate: value =>
                                    value === password || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-900 text-white rounded-md font-semibold text-sm hover:bg-gray-800 transition"
                    >
                        Update Password
                    </button>
                </form>

            </div>
        </div>
    );
}
