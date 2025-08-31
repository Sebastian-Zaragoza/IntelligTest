import {useQuery} from "@tanstack/react-query";
import {getUser} from "../api/AuthApi.ts";

export const useAuth = ()=>{
    const {isError, isLoading, data} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    })
    return {isError, isLoading, data}
}