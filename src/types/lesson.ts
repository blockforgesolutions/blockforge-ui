
export type Lesson = {
    id:string,
    title:string,
    content:string,
    moduleId:string,
    videoUrl?:string
    quiz?:string[],
    slug:string,
    createdAt:Date,
    updatedAt:Date
}