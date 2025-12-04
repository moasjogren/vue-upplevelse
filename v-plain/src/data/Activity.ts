export interface Activity {
    id: string,
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
    id: "hdsh3w421sho12",
    imgLink:
      "https://tse3.mm.bing.net/th/id/OIP.uF4xhcEH4QKRB9cX8sMSeAHaFA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Test Title",
    description:
      "Lorem Ipsum test text hihi when lorem ipsum went ipsum dipsum",
    difficulty: 3,
    capacity: "3-6",
    age: 12,
    duration: 90,
    price: 319,
  },
  {
    id: "kd92jf83nsla94",
    imgLink:
      "https://tse3.mm.bing.net/th/id/OIP.uF4xhcEH4QKRB9cX8sMSeAHaFA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Adventure Quest",
    description:
      "Embark on an exciting journey through mysterious rooms and solve challenging puzzles",
    difficulty: 4,
    capacity: "2-5",
    age: 15,
    duration: 75,
    price: 399,
  },
  {
    id: "pl28hs73mqw156",
    imgLink:
      "https://tse3.mm.bing.net/th/id/OIP.uF4xhcEH4QKRB9cX8sMSeAHaFA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Mystery Manor",
    description:
      "Uncover the secrets of the old manor and escape before time runs out",
    difficulty: 2,
    capacity: "4-8",
    age: 10,
    duration: 60,
    price: 279,
  },
];

export default activityList;
