
type Instructor = {
    id: string,
    name: string,
    surname: string,
    picture:string,
}

export type Course = {
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    instructor: Instructor,
    price: number,
    createdAt: Date,
    updatedAt: Date,
    slug: string
}