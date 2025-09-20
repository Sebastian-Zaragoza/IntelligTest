import api from "../lib/axios.ts";
import {isAxiosError} from "axios";
import {
    type ConfirmToken,
    type RequestNewToken,
    type UserRegisterForm,
    type UserLoginForm,
    type RequestNewTokenForgetPassword, type NewPasswordResetForm, type CheckPasswordForm, userSchema
} from "../types/Auth.ts";

export async function createAccount(formData: UserRegisterForm){
    try {
        const url = `${import.meta.env.VITE_AUTH_URL}/api/auth/create-account`;
        const {data} = await api.post<string>(url, formData)
        return data
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(formData: ConfirmToken){
    try{
        const url = `${import.meta.env.VITE_AUTH_URL}/api/auth/confirm-account`;
        const {data} = await api.post<string>(url, formData)
        return data
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function requestNewCode(formData: RequestNewToken){
    try{
        const url = `${import.meta.env.VITE_AUTH_URL}/api/auth/request-token`;
        const {data} = await api.post<string>(url, formData)
        return data
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function loginAccount(formData: UserLoginForm){
    try{
        const url = `${import.meta.env.VITE_AUTH_URL}/api/auth/login`;
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('IntelligTestToken', data)
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function forgetPassword(formData: RequestNewTokenForgetPassword){
    try{
        const url = `${import.meta.env.VITE_AUTH_URL}/api/auth/forget-password`;
        const {data} = await api.post<string>(url, formData)
        return data
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function validateToken(formData: ConfirmToken){
    try {
        const url = `${import.meta.env.VITE_AUTH_URL}/api/auth/validate-token`;
        const {data} = await api.post<string>(url, formData)
        return data
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function updatePasswordWithToken({formData, token}:{formData: NewPasswordResetForm, token: ConfirmToken['token']}){
    try{
        const url = `${import.meta.env.VITE_AUTH_URL}/api/auth/update-password/${token}`;
        const {data} = await api.post<string>(url, formData)
        return data
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUser() {
    try{
        const {data} = await api("/api/auth/user");
        const response = userSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function checkPassword(formData: CheckPasswordForm){
    try{
        const url = '/api/auth/check-password';
        const {data} = await api.post<string>(url, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
