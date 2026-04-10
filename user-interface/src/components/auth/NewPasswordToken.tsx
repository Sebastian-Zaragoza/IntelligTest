import {Link} from "react-router";
import {PinInput, PinInputField} from "@chakra-ui/pin-input";
import type {ConfirmToken} from "../../types/Auth.ts";
import {useMutation} from "@tanstack/react-query";
import {validateToken} from "../../api/AuthApi.ts";
import {toast} from "sonner";
import * as React from "react";

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken}: NewPasswordTokenProps) {
    const {mutate} = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message.toString(),{
                duration: 7000
            });
        },
        onSuccess: (data) => {
            toast.success(data, {
                duration: 7000
            })
        }
    })

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken['token']) => {
        mutate({token})
        setIsValidToken(true)
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
                        Enter the 6-digit code received{' '}
                        <span className="font-semibold text-gray-600">via email</span>
                    </p>
                </div>

                <form className="space-y-6" noValidate>
                    <div className="flex justify-between gap-2">
                        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField className="w-12 h-14 rounded-md border border-gray-200 placeholder-white text-center text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            <PinInputField className="w-12 h-14 rounded-md border border-gray-200 placeholder-white text-center text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            <PinInputField className="w-12 h-14 rounded-md border border-gray-200 placeholder-white text-center text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            <PinInputField className="w-12 h-14 rounded-md border border-gray-200 placeholder-white text-center text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            <PinInputField className="w-12 h-14 rounded-md border border-gray-200 placeholder-white text-center text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            <PinInputField className="w-12 h-14 rounded-md border border-gray-200 placeholder-white text-center text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </PinInput>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Didn't receive a code?{' '}
                    <Link to={'/auth/request-token'} className="text-gray-900 font-semibold hover:underline">
                        Request a new one
                    </Link>
                </p>

            </div>
        </div>
    );
}
