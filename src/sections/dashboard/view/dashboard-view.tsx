'use client'
import { useEffect, useState } from "react";
import CourseHero from "../course-hero";
import { CourseList } from "../course-list";
import { Course } from "@/types/course";
import { getCourses } from "@/services/course";
import { Spinner } from "@/components/spinner";

export default function DashboardView() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        setLoading(true);
        const response = await getCourses();
        setCourses(response);
        setLoading(false);
    }

    useEffect(() => {
        fetchCourses();
    }, [])

    return (
        <div className="container mx-auto px-4">

            {loading && <Spinner size={"large"} />}

            <CourseHero />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                {courses.map((course) => (
                    <CourseList
                        key={course.id}
                        course={course}
                    />
                ))}
            </div>
        </div>
    )
}