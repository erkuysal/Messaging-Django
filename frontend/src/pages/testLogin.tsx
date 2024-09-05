import {useAuthServiceContext} from "../context/AuthContext.tsx";
import {useState} from "react";
import axios from "axios";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor.ts";


const TestLogin = () => {
    const {isLoggedIn, logout} = useAuthServiceContext();
    const [ username, setUsername ] = useState("");
    const jwtAxios = useAxiosWithInterceptor();

    const get_UserDetails  = async () => {
        try {
            const response = await jwtAxios.get(
                `http://127.0.0.1:8000/api/account/?user_id=1 `,
                {
                    withCredentials: true,
                }
            );

            const userDetails = response.data;
            setUsername(userDetails.username);

        } catch(err: any) {
            return err;
        }
    }

    return (
        <>
            <div>
                {isLoggedIn.toString()}
            </div>

            <div>
                <button onClick={logout}>Logout</button>
            </div>

            <div>
                <button onClick={get_UserDetails}>User Details</button>
                <h1>Username : {username}</h1>
            </div>
        </>
    )
}

export default TestLogin;