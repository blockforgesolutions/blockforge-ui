import { Category } from "./category"
import { Instructor } from "./instuructor"

export type Course = {
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    instructor: Instructor,
    price: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    slug: string,
    categories: Category[],
}