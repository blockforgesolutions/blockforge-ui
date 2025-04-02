import { Lesson } from "@/types/lesson";
import { Module } from "@/types/module";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface CourseModuleListProps {
    modules: Module[];
    lessons: Record<string, Lesson[]>;
    slug: string
}

export function CourseModuleList({ modules, lessons, slug }: CourseModuleListProps) {
    return (
        <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-6 mb-8 border border-border">
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <div className="space-y-4">
                    {modules?.map((module, index) => (
                        <div
                            key={module.id}
                            className="border border-border rounded-lg"
                        >
                            <div className="p-4 border-b border-border">
                                <h3 className="font-medium">
                                    Module {index + 1}: {module.title}
                                </h3>
                            </div>
                            <div className="divide-y divide-border">
                                {lessons[module.id]?.map((lesson, lessonIndex) => (
                                    <div

                                        key={lesson.id}
                                        className="p-4 hover:bg-muted/50 transition-colors"
                                    >
                                        <Link href={`/course/${slug}/lesson-title`}>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                                                    {lessonIndex + 1}
                                                </div>
                                                <div className="flex items-center gap-3 text-foreground">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">
                                                        {lesson.title}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}