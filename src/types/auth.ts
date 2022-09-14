export interface User {
    id: string;
    name: string;
    email: string;
    iat?: string;
    eat?: string;
}

export interface SignupData {
    name: string;
    email: string;
    password: string;
}

export interface SigninData {
    email: string;
    password: string;
}

export interface TokenData {
    user: User,
    accessToken: string,
    refreshToken: string
}