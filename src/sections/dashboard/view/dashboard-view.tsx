'use client'
import { useEffect, useState } from "react";
import CourseHero from "../course-hero";
import { CourseList } from "../course-list";
import { Course } from "@/types/course";
import { getCourses, getCoursesByCategories } from "@/services/course";
import { Spinner } from "@/components/spinner";
import Sidebar from "../course-sidebar";
import { getCategoriesByType } from "@/services/category";
import { Category } from "@/types/category";
import { CourseSort } from "../course-sort";
import { CourseSkeletonCard } from "@/components/card-skeleton";
import { CourseStatus } from "@/enums/course-status";

export default function DashboardView() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtering, setFiltering] = useState(false);

    const onFilterChange = async (filters: { categories: string[]; sortBy?: string }) => {
        setFiltering(true);
        try {
            const { categories } = filters;
            const response = categories.length > 0
                ? await getCoursesByCategories(categories)
                : await getCourses();
            setCourses(response);
        } catch (error) {
            console.error("Filter error:", error);
        } finally {
            setFiltering(false);
        }
    };

    const fetchCourses = async () => {
        setLoading(true);
        const response = await getCourses(CourseStatus.PUBLISHED);
        setCourses(response);
        setLoading(false);
    }

    const fetchCategories = async () => {
        setLoading(true)
        const response = await getCategoriesByType('COURSE')
        setCategories(response);
        setLoading(false);
    }

    useEffect(() => {
        fetchCourses();
        fetchCategories();
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
                            : courses.map((course) => <CourseList key={course.id} course={course} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}