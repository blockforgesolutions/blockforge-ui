'use client';
import { Spinner } from "@/components/spinner";
import { getFullCourseByLessonSlug, getLessonsByModuleId } from "@/services/lesson";
import { Course } from "@/types/course";
import { Lesson } from "@/types/lesson";
import { Module } from "@/types/module";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LessonHero } from "../lesson-hero";
import { CourseDescription } from "../course-description";
import { LessonSidebar } from "../lesson-sidebar";

export default function LessonView() {
    const [course, setCourse] = useState<Course>();
    const [modules, setModules] = useState<Module[]>([]);
    const [lesson, setLesson] = useState<Lesson>();
    const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const { lessonSlug } = params

    const fetchFullCourse = async () => {
        setLoading(true);
        try {
            const response = await getFullCourseByLessonSlug(lessonSlug as string);
            setCourse(response.course);
            setModules(response.modules);
            setLesson(response.lesson);

            // Fetch lessons after we have the modules
            await fetchLessons(response.modules);
        } catch (error) {
            console.error("Error fetching course:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLessons = async (moduleList: Module[]) => {
        try {
            const lessonsMap: Record<string, Lesson[]> = {};

            // Process modules sequentially to avoid race conditions
            // eslint-disable-next-line @next/next/no-assign-module-variable
            for (const module of moduleList) {
                const moduleLessons = await getLessonsByModuleId(module.id);
                console.log(moduleLessons);
                
                lessonsMap[module.id] = moduleLessons;
            }

            setLessons(lessonsMap);
        } catch (error) {
            console.error("Error fetching lessons:", error);
        }
    };

    useEffect(() => {
        fetchFullCourse();
    }, [lessonSlug]);

    console.log(lessons);
    

    return (
        <div className="min-h-screen bg-background flex p-12">
            {loading && <Spinner size={"large"} />}
            <div className="container mx-auto px-12 py-12">
                <div className="w-full">
                    {lesson && <LessonHero lesson={lesson} />}

                    <div className="mt-4">
                        {course && <CourseDescription course={course} />}
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex p-4 my-12">
                {course && module && lessons && <LessonSidebar lessons={lessons} course={course} modules={modules} currentLessonId={lesson?.id} />}
            </div>
        </div>
    )
}