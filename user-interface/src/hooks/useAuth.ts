import {useQuery} from "@tanstack/react-query";
import api from "../lib/axios.ts";

export const useAuth = ()=>{
    const {isError, isLoading, data} = useQuery({
        queryKey: ['user'],
        queryFn: async ()=>{
            try {
                const response = await api.get<{_id: string; name: string; email:string}>('/api/auth/user');
                return response.data;
            } catch (error: any) {
                if (error.response?.status === 401) {
                    localStorage.removeItem('IntelligTestToken');
                }
                throw error;
            }
        },
        retry: false,
        refetchOnWindowFocus: false
    })
    return {isError, isLoading, data}
}