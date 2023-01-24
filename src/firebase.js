// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIOy0b4d1AdVsFHiHmP7g8-P48uPl5TrY",
  authDomain: "todo-web-afd84.firebaseapp.com",
  projectId: "todo-web-afd84",
  storageBucket: "todo-web-afd84.appspot.com",
  messagingSenderId: "410683778459",
  appId: "1:410683778459:web:68efcd8444e88f59366d3e",
  databaseURL: "https://todo-web-afd84-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export function writeTodoListData(todoText) {
  const postListRef = ref(database, "todos");
  const newPostRef = push(postListRef);
  let newTodo = {
    todoText: todoText,
    completed: false,
    id: newPostRef.key
  };
  set(newPostRef, newTodo);
  return newTodo;
}



// const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
{/* <input
                      type="checkbox"
                      className="todo-checkbox"
                      id={`todo-label-${todo.id}`}
                      value={todo.completed}
                       onClick={(event) => onChageTodoItem(event, todo.id)}
                    /> */}