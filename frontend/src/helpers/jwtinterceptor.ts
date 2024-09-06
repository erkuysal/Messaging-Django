import axios, {AxiosInstance} from "axios";
import {useNavigate} from "react-router-dom";

import { useAuthService } from "../services/AuthService.ts";
import {BASE_URL} from "../config.ts";

const API_BASE_URL = BASE_URL;


const useAxiosWithInterceptor = (): AxiosInstance => {
    const jwtAxios = axios.create({ baseURL: API_BASE_URL });
    const navigate = useNavigate();
    const { logout } = useAuthService();

    jwtAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async(error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 || 403) {
                axios.defaults.withCredentials = true;

                try {
                    const response = await axios.post(
                        `${API_BASE_URL}/token/refresh/`,
                    );

                    if (response.status === 200) {
                        return jwtAxios(originalRequest);
                    }

                } catch (refreshError) {
                    const goLogin= () => navigate("/login");
                    logout();
                    goLogin();
                    return Promise.reject(refreshError);
                }
            }
        }
    )
    return jwtAxios;
}

export default useAxiosWithInterceptor;
