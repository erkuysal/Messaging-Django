export interface AuthServiceProps {
    login: (username: string, password: string) => Promise<any>;
    register: (username: string, password: string) => Promise<any>;
    refreshAccessToken: () => Promise<void>;
    isLoggedIn : boolean;
    logout: () => void;
}