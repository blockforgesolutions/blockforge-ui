import { Button } from "@/components/ui/button"
import { Course } from "@/types/course"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CourseHeroProps {
    course: Course
}

export function CourseHero({ course }: CourseHeroProps) {
    return (
        <div className="relative h-[60vh] w-full">
            {course.thumbnail && (
                <Image
                    src={course.thumbnail || ""}
                    alt={course.title || "Course Title"}
                    fill
                    className="object-cover"
                    priority
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60" />
            <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-12">
                <Link
                    href="/"
                    prefetch={false}
                    className="text-white mb-8 flex items-center hover:text-primary transition-colors w-fit"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Courses
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {course.title}
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl">
                            {course.description}
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:min-w-[300px]">
                        <div className="text-3xl font-bold text-white mb-4">
                            {course.price === 0 ? "Free" : `$${course.price}`}
                        </div>
                        <Button className="w-full text-xl"> Enroll Now </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}