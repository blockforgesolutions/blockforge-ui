import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Tag } from "lucide-react"
import { Course } from "@/types/course"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CourseDescriptionProps {
    course: Course
}

export function CourseDescription({ course }: CourseDescriptionProps) {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    };

    return (
        <Card className="bg-gray-50 dark:bg-gray-900 border rounded-xl overflow-hidden shadow-lg mb-6">

            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={course.instructor.picture || "/api/placeholder/100/100"} alt={`${course.instructor.name} ${course.instructor.surname}`} />
                            <AvatarFallback>{course.instructor.name[0]}{course.instructor.surname[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
                            <p className="font-medium">{course.instructor.name} {course.instructor.surname}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                            <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                                <p className="font-medium">${course.price.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                                <p className="font-medium">{formatDate(course.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Course Description</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {course.description}
                    </p>
                </div>

                <Separator className="my-6" />

                <div>
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                        {course.categories.map((category) => (
                            <Badge key={category.id} variant="outline" className="flex items-center gap-1 px-3 py-1">
                                <Tag className="h-3 w-3" />
                                {category.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}