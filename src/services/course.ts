import { api } from "@/lib/api"

export const getCourses = async() => {
    try {
        const response = await api.get('course');

        return response.data;
    } catch (error) {
        throw error
    }
}

export const getCourseById = async(courseId:string) => {
    try {
        const response = await api.get(`course/${courseId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}