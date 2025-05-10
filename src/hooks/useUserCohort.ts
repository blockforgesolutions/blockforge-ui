'use client'
import { useState, useEffect } from 'react';
import { getUserEnrollments } from '@/services/enrollment';
import { Enrollment } from '@/types/enrollment';
import { Course } from '@/types/course';
import { getCourseById } from '@/services/course';

const useUserCohorts = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [originalCourses, setOriginalCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const fetchCohorts = async () => {
    try {
      const res = await getUserEnrollments();
      setEnrollments(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any | null) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    console.log(enrollments);

    const courses = await Promise.all(
      enrollments.map((enrollment) => getCourseById(enrollment.courseId))
    );
    setUserCourses(courses);
    setOriginalCourses(courses);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    setToken(storedToken);
  }, []);
  
  useEffect(() => {
    if (token) {
      fetchCohorts();
    }
  }, [token]);
  
  useEffect(() => {
    if (enrollments.length > 0) {
      fetchCourses();
    }
  }, [enrollments]);

  return { enrollments, userCourses, loading, error, setUserCourses, originalCourses };
};

export default useUserCohorts;
