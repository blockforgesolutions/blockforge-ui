import { api } from "@/lib/api"
import { FullCourse } from "@/types/full-course";
import { Lesson } from "@/types/lesson";


export async function getLessonsByModuleId(moduleId:string): Promise<Lesson[]> {
    try {
        const response = await api.get(`lesson/module/${moduleId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getFullCourseByLessonSlug(lessonSlug:string): Promise<FullCourse> {
    try {
        const response = await api.get(`lesson/full-course/${lessonSlug}`);

        return response.data;
    } catch (error) {
        throw error
    }
}

