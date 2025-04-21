import MyCoursesView from "@/sections/my-courses/view/my-courses-view"

export async function generateMetaData() {
    return {
        title: 'My Courses',
    }
}

export default function Page() {
    return <MyCoursesView />
}