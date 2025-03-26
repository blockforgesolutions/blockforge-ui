import { api } from "@/lib/api"
import { Module } from "@/types/module"

export async function getModulesByCourseId(courseId:string): Promise<Module[]> {
    try {
        const response = await api.get(`module/course/${courseId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}

