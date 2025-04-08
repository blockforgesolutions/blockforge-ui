import { api } from "@/lib/api"
import { AuthResponse } from "@/types/auth";


export async function signIn(email: string, password: string) {
    try {
        const response = await api.post('/auth/signin', {
            email,
            password
        });

        return response.data;
    } catch (error) {
        throw error
    }
}

type SignUp = {
    name: string,
    email: string,
    password: string,
    surname: string
}

export async function signup(formData: SignUp): Promise<AuthResponse> {
    try {
        const response = await api.post('/auth/signup', formData);

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function uploadProfilePicture(formData: FormData): Promise<string> {
    try {
        const response = await api.post('auth/picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}