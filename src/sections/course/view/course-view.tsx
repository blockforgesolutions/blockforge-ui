'use client'
import { Course } from "@/types/course";
import { CourseHero } from "../course-hero";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCourseBySlug } from "@/services/course";
import { Spinner } from "@/components/spinner";
import { Module } from "@/types/module";
import { getModulesByCourseId } from "@/services/module";
import { getLessonsByModuleId } from "@/services/lesson";
import { Lesson } from "@/types/lesson";
import { CourseModuleList } from "../course-module-list";
import { CourseSidebar } from "../course-sidebar";
import { checkEnrollment } from "@/services/enrollment";


export function CourseView() {
    const [course, setCourse] = useState<Course>();
    const [modules, setModules] = useState<Module[]>([]);
    const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
    const params = useParams();
    const { slug } = params
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);

    const fetchCourse = async () => {
        setLoading(true);
        const courseResponse = await getCourseBySlug(slug as string);
        setCourse(courseResponse);
        
        const modulesResponse = await getModulesByCourseId(courseResponse.id);
        setModules(modulesResponse);

        const lessonsData = await Promise.all(
            modulesResponse.map(async (module) => {
                const moduleLessons = await getLessonsByModuleId(module.id);
                return { moduleId: module.id, lessons: moduleLessons };
            })
        );

        const lessonsMap: Record<string, Lesson[]> = {};
        lessonsData.forEach(({ moduleId, lessons }) => {
            lessonsMap[moduleId] = lessons;
        });
        setLessons(lessonsMap);

        await fetchEnrollmentStatus(courseResponse.id);

        setLoading(false);
    };

    const fetchEnrollmentStatus = async (courseId: string) => {
        const enrolled = await checkEnrollment(courseId);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        enrolled ? setIsEnrolled(true) : setIsEnrolled(false);
    };

    useEffect(() => {
        fetchCourse();
    }, [slug])

    return (
        <div className="min-h-screen bg-background">
            {loading && <Spinner size={"large"} />}

            {course && <CourseHero course={course} isEnrolled={isEnrolled} />}

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {modules.length > 0 && <CourseModuleList isEnrolled={isEnrolled} modules={modules} lessons={lessons} slug={slug as string} />}
                    {course && <CourseSidebar instructor={course.instructor} />}
                </div>
            </div>
        </div>
    )
}