import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";
import AddTodo from "./components/AddTodo";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { writeTodoListData, getTodoListData, database } from "./firebase";
import { onValue, ref, remove, set, update, push } from "firebase/database";
import Login from "./components/Login";

function App() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoList, setTodoList] = useState([]);

  const [darkTheme, setDarkTheme] = useState(
    () => JSON.parse(localStorage.getItem("theme")) || false
  );

  // get data from firebase
  const getTodoListData = () => {
    const getAllDataRef = ref(database, "todos");
    onValue(
      getAllDataRef,
      (snapshot) => {
        let childData = [];
        snapshot.forEach((childSnapshot) => {
          // const childKey = childSnapshot.key;
          childData.push(childSnapshot.val());
          console.log("datalist from firebase:", childData);
        });
        setTodos(childData);
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    getTodoListData();
  }, []);

  // change dark theme
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  const onChangeDarkTheme = () => {
    setDarkTheme((theme) => !theme);
  };

  const countItems = () => {
    return todos.filter((todo) => todo.completed !== true).length;
  };
  const [count, setCount] = useState(countItems);

  useEffect(() => {
    setCount(countItems);
    setTodoList(todos);
  }, [todos]);

  //show todo with status
  const showTodoWithStatus = (status) => {
    if (status === "all") {
      setTodoList(todos);
      return;
    }
    if (status === "active") {
      setTodoList(todos.filter((todo) => !todo.completed));
    } else if (status === "completed") {
      setTodoList(todos.filter((todo) => todo.completed));
    }
  };

  const addTodo = (todoText) => {
    //set data to firebase
    const newTodo = writeTodoListData(todoText);
    setTodos((todos) => [...todos, newTodo]);
  };

  const changeStatus = (id, previousStatus) => {
    console.log("previous status:", previousStatus);
    const todoRefs = ref(database, "todos/" + id);

    update(todoRefs, {
      completed: !previousStatus,
    });

    setTodos((oldTodo) =>
      oldTodo.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };

  const deleteTodoItem = (id) => {
    const todoRefs = ref(database, "todos/" + id);
    remove(todoRefs);
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const allClearCompleted = () => {
    todos.map((todo) => {
      if (todo.completed) {
        const todoRefs = ref(database, "todos/" + todo.id);
        remove(todoRefs);
      }
      return todo;
    });
    setTodos((todos) => todos.filter((todo) => todo.completed === false));
  };

  const onhandleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((todoItems) => {
        console.log("arrayMove:", todoItems);
        const oldIndex = todoItems.map((item) => item.id).indexOf(active.id);
        const newIndex = todoItems.map((item) => item.id).indexOf(over.id);
        return arrayMove(todoItems, oldIndex, newIndex);
      });
    }
    set(ref(database, "todos"), null);
    todos.forEach((todo) => {
      const postListRef = ref(database, "todos");
      const newPostRef = push(postListRef);
      let newTodo = {
        todoText: todo.todoText,
        completed: todo.completed,
        id: newPostRef.key,
      };
      set(newPostRef, newTodo);
    });
  };

  return (
    <>
    <Login />
      {/* <main className={darkTheme ? "dark-theme" : " "}>
        <header className="header-img"></header>
        <section className="todo-section">
          <div className="app-title">
            <h1 className="title">todo</h1>
            <div className="theme-change">
              <img
                src={darkTheme ? sunIcon : moonIcon}
                alt="light theme icon"
                onClick={onChangeDarkTheme}
              />
            </div>
          </div>
          <AddTodo
            count={count}
            addTodo={addTodo}
            todoList={todoList}
            changeStatus={changeStatus}
            showTodoWithStatus={showTodoWithStatus}
            deleteTodoItem={deleteTodoItem}
            allClearCompleted={allClearCompleted}
            onhandleDragEnd={onhandleDragEnd}
          ></AddTodo>
        </section>
      </main> */}
    </>
  );
}

export default App;
