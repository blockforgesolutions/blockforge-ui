import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "@/types/course";
import { Module } from "@/types/module";
import { Lesson } from "@/types/lesson";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

interface LessonSidebarProps {
    course: Course;
    lessons: Record<string, Lesson[]>;
    modules: Module[];
    currentLessonId?: string;
    onLessonSelect?: (lessonId: string) => void;
    completedLessons?: string[];
}

export function LessonSidebar({
    course,
    lessons,
    modules,
    currentLessonId,
    onLessonSelect,
    completedLessons = []
}: LessonSidebarProps) {
    const [openModules, setOpenModules] = useState<Record<string, boolean>>(
        modules.reduce((acc, module) => ({ ...acc, [module.id]: true }), {})
    );

    console.log(lessons);


    const allLessons = Object.values(lessons).flat();
    const totalLessons = allLessons.length;
    const totalCompleted = completedLessons.length;
    const completionPercentage = totalLessons > 0
        ? Math.round((totalCompleted / totalLessons) * 100)
        : 0;

    const toggleModule = (moduleId: string) => {
        setOpenModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const isLessonCompleted = (lessonId: string) => {
        return completedLessons.includes(lessonId);
    };

    return (
        <div className="bg-card rounded-lg p-4 sticky border border-border max-h-[calc(100vh-2rem)] overflow-y-auto w-72 ">
            <div className="mb-4">
                <h2 className="font-semibold text-lg truncate" title={course?.title}>
                    {course?.title}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                    <Progress value={completionPercentage} className="h-2" />
                    <span className="text-xs font-medium text-muted-foreground">
                        {completionPercentage}%
                    </span>
                </div>
            </div>

            <Separator className="my-3" />

            <div className="space-y-1">
                {modules.map((module) => (
                    <Collapsible
                        key={module.id}
                        open={openModules[module.id]}
                        onOpenChange={() => toggleModule(module.id)}
                        className="pt-1"
                    >
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                className="w-full justify-between text-left p-2 h-auto font-medium"
                            >
                                <span className="truncate flex-1 mr-2">{module.title}</span>
                                {openModules[module.id] ? (
                                    <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                                )}
                            </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="pl-2">
                            {lessons[module.id]?.map((lesson) => (
                                <Link
                                    href={`/course/${course.slug}}/${lesson.slug}`}
                                    key={lesson.id}
                                    className="cursor-pointer"
                                >
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "w-full justify-start gap-2 pl-6 py-1.5 h-auto text-sm font-normal",
                                            currentLessonId === lesson.id && "bg-accent text-accent-foreground"
                                        )}
                                        onClick={() => onLessonSelect?.(lesson.id)}
                                    >
                                        {isLessonCompleted(lesson.id) ? (
                                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                                        ) : (
                                            <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                                        )}
                                        <span className="truncate flex-1">{lesson.title}</span>
                                    </Button>
                                </Link>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    );
}