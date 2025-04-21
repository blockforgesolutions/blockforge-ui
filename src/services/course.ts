import { api } from "@/lib/api"
import { Course } from "@/types/course";
import qs from 'qs';

export async function getCourses(status?:string): Promise<Course[]> {
    try {
        const response = await api.get('course', {
            params:{
                status: status
            }
        });

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

export async function getCoursesByCategories(categories:string[]):Promise<Course[]> {
    try {
        const response = await api.get('course/categories/filter', {
            params: {
                categories
            },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
        });

        return response.data
    } catch (error) {
        throw error
    }
    
}