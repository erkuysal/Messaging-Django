import axios from "axios";
import {useState} from "react";

import { AuthServiceProps } from "../@types/auth-service";
import {set} from "js-cookie";


export function useAuthService(): AuthServiceProps {

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

            get_UserDetails()

        } catch(err: any) {
            localStorage.setItem("isLoggedIn", "false")
            setIsLoggedIn(false)

            return err;
        }
    }

    const logout = () => {
        localStorage.setItem("isLoggedIn", "false")
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")
        setIsLoggedIn(false)
    }

    return {login, isLoggedIn, logout}
}