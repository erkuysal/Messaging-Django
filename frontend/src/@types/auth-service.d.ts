export interface AuthServiceProps {
    login: (username: string, password: string) => Promise<void>;
//  logout: () => void;
}