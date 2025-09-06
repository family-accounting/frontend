import axios, { AxiosRequestHeaders } from "axios";
import { useAuthStore } from "@/stores/authStore";


 const useApi = ()=>{
    const authStore = useAuthStore();
    const instance = axios.create({
        baseURL: 'http://localhost:4040/api/v1',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    
    });
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authStore.token}`,
        
    } as AxiosRequestHeaders
    instance.interceptors.request.use((config)=>{
        config.baseURL = 'http://localhost:4040/api/v1';
        config.headers = headers as AxiosRequestHeaders;
        return config;
    });

    instance.interceptors.response.use((response)=>{
        return response;
    },(error)=>{
        return Promise.reject(error);
    });

    return instance;
 }


export { useApi };