'use client'
import { useEffect, useState } from "react";
import CourseHero from "../course-hero";
import { Course } from "@/types/course";
import { getCourses } from "@/services/course";
import { Spinner } from "@/components/spinner";
import Sidebar from "../course-sidebar";
import { CourseSort } from "../course-sort";
import { CourseSkeletonCard } from "@/components/card-skeleton";
import { CourseStatus } from "@/enums/course-status";
import { CourseCard } from "@/components/course-card";
import useCategories from "@/hooks/useCategories";
import useCourseFilter from "@/hooks/useCourseFilter";

export default function DashboardView() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [originalCourses, setOriginalCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const { categories } = useCategories();
    const { filtering, onFilterChange } = useCourseFilter(setCourses, originalCourses);

    const fetchCourses = async () => {
        setLoading(true);
        const response = await getCourses(CourseStatus.PUBLISHED);
        setCourses(response);
        setOriginalCourses(response);
        setLoading(false);
    }


    useEffect(() => {
        fetchCourses();
    }, [])

    return (
        <div className="container mx-auto px-4">
            {loading && <Spinner size={"large"} />}

            <CourseHero />

            <div className="lg:flex w-full lg:gap-12">
                <div>
                    <Sidebar categories={categories} onFilterChange={onFilterChange} />
                </div>
                <div className="w-full">
                    <CourseSort />
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16 transition-opacity duration-300 ${filtering ? "opacity-50" : "opacity-100"}`}>
                        {loading
                            ? Array.from({ length: 6 }).map((_, idx) => <CourseSkeletonCard key={idx} />)
                            : courses.map((course) => <CourseCard key={course.id} course={course} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}