import api from "../lib/axios.ts";
import {isAxiosError} from "axios";
import type {
    ConfirmToken,
    RequestNewToken,
    UserRegisterForm,
    UserLoginForm,
    RequestNewTokenForgetPassword, NewPasswordResetForm, CheckPasswordForm
} from "../types/Auth.ts";

export async function createAccount(formData: UserRegisterForm){
    try {
        const url = 'http://localhost:4001/api/auth/create-account'
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
        const url = 'http://localhost:4001/api/auth/confirm-account'
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
        const url = 'http://localhost:4001/api/auth/request-token'
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
        const url = 'http://localhost:4001/api/auth/login'
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
        const url = 'http://localhost:4001/api/auth/forget-password'
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
        const url = 'http://localhost:4001/api/auth/validate-token'
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
        const url = `http://localhost:4001/api/auth/update-password/${token}`
        const {data} = await api.post<string>(url, formData)
        return data
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function checkPassword(formData: CheckPasswordForm){
    try{
        const url = '/auth/check-password';
        const {data} = await api.post<string>(url, formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
