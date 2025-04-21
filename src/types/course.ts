
type Instructor = {
    id: string,
    name: string,
    surname: string,
    picture: string,
}

type Category = {
    id: string,
    name: string,
    type: string
}

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