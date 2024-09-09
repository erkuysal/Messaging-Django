import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import { AuthServiceProps } from "../@types/auth-service";
import {BASE_URL} from "../config.ts";


export function useAuthService(): AuthServiceProps {

    const navigate = useNavigate();

    const getInitialLogValue = () => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        return loggedIn !== null && loggedIn === "true";
    };

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getInitialLogValue())

    const get_UserDetails  = async () => {
        try {
            const userID = localStorage.getItem("user_id") // getItem function takes a JSON string as a parameter
            const response = await axios.get(
                `http://127.0.0.1:8000/api/account/?user_id=${userID}`,
                {
                    withCredentials: true
                }
            );

            const userDetails = response.data;
            localStorage.setItem("username", userDetails.username)
            localStorage.setItem("isLoggedIn", "true")

            setIsLoggedIn(true);

        } catch(err: any) {
            localStorage.setItem("isLoggedIn", "false")
            setIsLoggedIn(false);
            return err;
        }
    }

    const register = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register/",
                {
                    username,
                    password,
                }, {withCredentials: true}
            );

            return response.status

        } catch(err: any) {

            return err.response.status;
        }
    }


    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                {
                    username,
                    password,
                }, {withCredentials: true}
            );

            const user_id = response.data.user_id;

            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("user_id", user_id)
            setIsLoggedIn(true);

            await get_UserDetails()

        } catch(err: any) {
            localStorage.setItem("isLoggedIn", "false")
            setIsLoggedIn(false)

            return err;
        }
    }

    const refreshAccessToken = async () => {
        try {
             await axios.post(
                `${BASE_URL}/token/refresh/`, {}, {withCredentials: true}
            )
        } catch(refreshError) {
            return Promise.reject(refreshError)
        }
    }

    const logout = async () => {
        localStorage.setItem("isLoggedIn", "false")
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")
        setIsLoggedIn(false)

        navigate("/login")

        try {
             await axios.post(
                `${BASE_URL}/logout/`, {}, {withCredentials: true}
            )
        } catch(refreshError) {
            return Promise.reject(refreshError)
        }
    }

    return {register, login, isLoggedIn, logout, refreshAccessToken}
}