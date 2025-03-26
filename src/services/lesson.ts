import { api } from "@/lib/api"
import { Lesson } from "@/types/lesson";


export async function getLessonsByModuleId(moduleId:string): Promise<Lesson[]> {
    try {
        const response = await api.get(`lesson/module/${moduleId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}

