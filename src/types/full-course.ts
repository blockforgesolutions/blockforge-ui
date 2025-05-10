import { Course } from "./course"
import { Lesson } from "./lesson"
import { Module } from "./module"

export type FullCourse = {
    course: Course
    modules: Module[]
    lesson: Lesson
}