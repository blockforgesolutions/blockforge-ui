'use client';
import { useState } from 'react';
import { Course } from '@/types/course';
import { getCoursesByCategories } from '@/services/course';

type Filters = {
    categories: string[];
    sortBy?: string;
};

const useCourseFilter = (
    onCoursesChange?: (courses: Course[]) => void,
    originalCourses: Course[] = []
) => {
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [filtering, setFiltering] = useState(false);
    const [loading, setLoading] = useState(true);

    const onFilterChange = async (filters: Filters) => {
        setLoading(true);
        setFiltering(true);
        try {
            const { categories } = filters;

            let response: Course[] = [];

            if (categories && categories.length > 0) {
                response = await getCoursesByCategories(categories);
            } else {
                response = originalCourses;
            }

            setFilteredCourses(response);
            onCoursesChange?.(response);
        } catch (error) {
            console.error('Filter error:', error);
            setLoading(false);
        } finally {
            setFiltering(false);
            setLoading(false);
        }
    };

    return {
        filteredCourses,
        filtering,
        onFilterChange,
        loading
    };
};

export default useCourseFilter;
