import { api } from "@/lib/api"


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