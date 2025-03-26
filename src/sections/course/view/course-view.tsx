'use client'
import { Course } from "@/types/course";
import { CourseHero } from "../course-hero";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCourseBySlug } from "@/services/course";
import { Spinner } from "@/components/spinner";


export function CourseView() {
    const [course, setCourse] = useState<Course>();
    const params = useParams();
    const { slug } = params
    const [loading, setLoading] = useState(true);

    const fetchCourse = async () => {
        setLoading(true);
        const response = await getCourseBySlug(slug as string);
        setCourse(response);
        setLoading(false);
    }

    useEffect(() => {
        fetchCourse();
    }, [])

    return (
        <div className="min-h-screen bg-background">
            {loading && <Spinner size={"large"} />}

            {course && <CourseHero course={course} />}

        </div>
    )
}