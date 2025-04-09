import Image from "next/image"

interface Instructor {
    id: string,
    name: string,
    surname: string,
    picture: string
}

interface CourseSidebarProps {
    instructor: Instructor
}

export function CourseSidebar({ instructor }: CourseSidebarProps) {
    return (
        <div>
            <div className="bg-card rounded-lg p-6 sticky top-4 border border-border">
                <h2 className="text-xl font-bold mb-4">Instructor</h2>
                {instructor && (
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            {instructor.picture && (
                                <div className="relative h-12 w-12">
                                    <Image
                                        src={instructor.picture || ""}
                                        alt={instructor.name || "Course Instructor"}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <div className="font-medium">
                                    {instructor.name} {instructor.surname}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Instructor
                                </div>
                            </div>
                        </div>
                        {/* {course.instructor.bio && (
                            <p className="text-muted-foreground">
                                {course.instructor.bio}
                            </p>
                        )} */}
                    </div>
                )}
            </div>
        </div>
    )
}