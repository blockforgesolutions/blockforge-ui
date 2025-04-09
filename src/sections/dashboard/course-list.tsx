'use client'
import { Loader } from "@/components/ui/loader";
import { Course } from "@/types/course";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CourseProgress } from "./course-progress";

interface CourseListProps {
    course: Course;
    progress?: number;
}

export function CourseList({ course, progress }: CourseListProps) {
    return (
        <Link
            href={`/course/${course.slug}`}
            prefetch={false}
            className="group hover:no-underline flex"
        >
            <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px] border border-border flex flex-col flex-1">
                <div className="relative h-52 w-full overflow-hidden">
                    {course.thumbnail ? (
                        <Image
                            fill
                            src={course.thumbnail || ""}
                            alt={course.title || "Course Image"}
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center bg-muted">
                            <Loader size="lg" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        {"price" in course && typeof course.price === "number" && (
                            <span className="text-white font-bold px-3 py-1 bg-black/50 dark:bg-white/20 rounded-full backdrop-blur-sm">
                                {course.price === 0
                                    ? "Free"
                                    : `$${course.price.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                    })}`}
                            </span>
                        )}
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {course.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {course.description}
                    </p>
                    <div className="space-y-4 mt-auto">
                        {course.instructor && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {course.instructor.picture ? (
                                        <div className="relative h-8 w-8 mr-2">
                                            <Image
                                                src={course.instructor.picture || ""}
                                                alt={course.instructor.name || "Instructor"}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-8 w-8 mr-2 rounded-full bg-muted flex items-center justify-center">
                                            <Loader size="sm" />
                                        </div>
                                    )}
                                    <span className="text-sm text-muted-foreground">
                                        by {course.instructor.name} {course.instructor.surname}
                                    </span>
                                </div>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </div>
                        )}
                        {typeof progress === "number" && (
                            <CourseProgress
                                progress={progress}
                                variant="default"
                                size="sm"
                                label="Course Progress"
                            />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}