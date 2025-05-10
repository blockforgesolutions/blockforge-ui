'use client'
import { CourseSkeletonCard } from "@/components/card-skeleton";
import { CourseCard } from "@/components/course-card";
import { Spinner } from "@/components/spinner";
import useCategories from "@/hooks/useCategories";
import useCourseFilter from "@/hooks/useCourseFilter";
import useUserCohorts from "@/hooks/useUserCohort";
import CourseHero from "@/sections/dashboard/course-hero";
import Sidebar from "@/sections/dashboard/course-sidebar";
import { CourseSort } from "@/sections/dashboard/course-sort";

export default function MyCoursesView() {
    const { userCourses, loading, setUserCourses, originalCourses } = useUserCohorts();
    const { categories } = useCategories();
    const { filtering, onFilterChange, } = useCourseFilter(setUserCourses, originalCourses);

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
                            : userCourses.map((course) => <CourseCard key={course.id} course={course} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}