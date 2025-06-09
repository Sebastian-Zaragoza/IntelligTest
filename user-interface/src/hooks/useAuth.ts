import {useQuery} from "@tanstack/react-query";
import api from "../lib/axios.ts";

export const useAuth = ()=>{
    const {isError, isLoading, data} = useQuery({
        queryKey: ['user'],
        queryFn: ()=>
            api.get<{_id: string; name: string; email:string}>('/api/auth/user').then((res)=>res.data),
        retry: false,
        refetchOnWindowFocus: false
    })
    return {isError, isLoading, data}
}