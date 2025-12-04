export interface Activity {
    activityId: string,
    imgLink: string,
    title: string,
    description: string,
    difficulty: number,
    capacity: string,
    age: number,
    duration: number,
    price: number,
}

const activityList: Activity[] = [
    {
        activityId: "hdsh3w421sho12",
        imgLink: "https://tse3.mm.bing.net/th/id/OIP.uF4xhcEH4QKRB9cX8sMSeAHaFA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Test Title",
        description: "Lorem Ipsum test text hihi when lorem ipsum went ipsum dipsum",
        difficulty: 3,
        capacity: "3-6",
        age: 12,
        duration: 90,
        price: 319,
    }
]

export default activityList;