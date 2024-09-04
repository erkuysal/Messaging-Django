import axios from "axios";
import {useState} from "react";

import { AuthServiceProps } from "../@types/auth-service";


export function useAuthService(): AuthServiceProps {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>( () => {
        const loggedIn = localStorage.getItem("isLoggedIn")

        if (loggedIn !== null) {
            return Boolean(loggedIn)
        } else {
            return false;
        }
    });

    const get_UserIdFromToken = (access) => {
        const token = access;

        const tokenParts = token.split(".");

        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);

        const payloadData = JSON.parse(decodedPayload);

        const userID = payloadData.user_id;

        return userID;
    }

    const get_UserDetails  = async () => {
        try {
            const userID = localStorage.getItem("userID") // getItem function takes a JSON string as a parameter
            const accessToken = localStorage.getItem("access_token")

            const response = await axios.get(
                `http://127.0.0.1:8000/api/account/?user_id=${userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
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
                }
            );

            const {access, refresh} = response.data;

            localStorage.setItem("access_token", access)
            localStorage.setItem("refresh_token", refresh)
            localStorage.setItem("userID", get_UserIdFromToken(access))

            localStorage.setItem("isLoggedIn", "true")
            setIsLoggedIn(true);
            get_UserDetails()

        } catch(err: any) {
            localStorage.setItem("isLoggedIn", "false")
            setIsLoggedIn(false)

            return err;
        }
    }

    return {login, isLoggedIn}
}