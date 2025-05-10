import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VideoPlayer } from "@/components/video-player"
import { Lesson } from "@/types/lesson"
import { SkipBack, SkipForward } from "lucide-react"

interface LessonHeroProps {
    lesson: Lesson
}

export function LessonHero({ lesson }: LessonHeroProps) {
    return (
        <div className="w-full bg-gray-950 text-white rounded-xl">
            <div className="container mx-auto py-6 px-4">
                <Card className="bg-gray-950 border-0 overflow-hidden mb-6">
                    <CardContent className="p-0 relative flex justify-center items-center">
                        {/* Video Player Component */}
                        { lesson.videoUrl ? (
                            <VideoPlayer url={lesson.videoUrl} />
                        ) : (
                            <Spinner size={"large"} />
                        )}
                    </CardContent>
                </Card>

                {/* Lesson Information */}
                <div className="space-y-6 p-2">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
                        <p className="text-gray-400">
                            {lesson.content}
                        </p>
                    </div>

                    {/* <div className="flex flex-wrap items-center gap-2">
                        {lesson.tags?.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-blue-400 border-blue-400">
                                {tag}
                            </Badge>
                        )) || (
                                <>
                                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                                        Course
                                    </Badge>
                                    <Badge variant="outline" className="text-green-400 border-green-400">
                                        Beginner
                                    </Badge>
                                </>
                            )}
                    </div> */}

                    {lesson.quiz && lesson.quiz.length > 0 && (
                        <div className="bg-gray-800 p-4 rounded-md">
                            <h2 className="text-lg font-semibold mb-2">Quiz</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                {lesson.quiz.map((question, index) => (
                                    <li key={index}>{question}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <Button variant="outline" className=" cursor-pointer flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white border-gray-700">
                            <SkipBack size={16} />
                            Previous lesson
                        </Button>

                        <Button variant="outline" className="cursor-pointer flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white border-gray-700">
                            Next lesson
                            <SkipForward size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}