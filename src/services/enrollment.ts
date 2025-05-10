import { api } from "@/lib/api";
import { Enrollment } from "@/types/enrollment";

export async function createEnrollment (courseId:string, amount:number): Promise<Enrollment> {
    try {
        const response = await api.post('enrollment', {
            courseId,
            amount
        });

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getUserEnrollments(): Promise<Enrollment[]> {
    try {
        const response = await api.get('enrollment/user');

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function checkEnrollment(courseId:string): Promise<boolean> {
    try {
        const response = await api.get(`enrollment/user/${courseId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}