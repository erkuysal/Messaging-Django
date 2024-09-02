import React, {createContext, useContext} from "react";

import {AuthServiceProps} from "../@types/auth-service";
import { useAuthService } from "../services/AuthService";


const AuthServiceContext = createContext<AuthServiceProps | null>(null);


export function AuthServiceProvider(props: React.PropsWithChildren) {
    const authServices = useAuthService();

    return(
        <AuthServiceContext.Provider value={authServices}>
            {props.children}
        </AuthServiceContext.Provider>
    )
}


export function useAuthServiceContext() {
    const context = useContext(AuthServiceContext);

    if (!context) {
        throw new Error("useAuthServiceContext must be used within an AuthServiceProvider");
    }

    return context;
}


export default AuthServiceProvider;