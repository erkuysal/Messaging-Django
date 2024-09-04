import {useAuthServiceContext} from "../context/AuthContext.tsx";


const TestLogin = () => {
    const {isLoggedIn} = useAuthServiceContext();

    return (
        <>{isLoggedIn.toString()}</>
    )
}

export default TestLogin;