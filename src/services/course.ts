import { api } from "@/lib/api"
import { Course } from "@/types/course";

export async function getCourses(): Promise<Course[]> {
    try {
        const response = await api.get('course');

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getCourseById(courseId:string):Promise<Course> {
    try {
        const response = await api.get(`course/${courseId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getCourseBySlug(slug: string):Promise<Course> {
    try {
        const response = await api.get(`course/slug/${slug}`);

        return response.data;
    } catch (error) {
        throw error
    }
}