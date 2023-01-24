import React from "react";
import { useState } from "react";
import deleteIcon from "../images/icon-cross.svg";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

export default function AddTodo({
  addTodo,
  todoList,
  changeStatus,
  count,
  showTodoWithStatus,
  deleteTodoItem,
  allClearCompleted,
  onhandleDragEnd,
}) {
  const [todo, setTodo] = useState("");
  const [indexValue, setIndexValue] = useState(0);

  const onChangeTodo = (e) => {
    setTodo(e.target.value);
  };
  const addTodoText = (event) => {
    console.log('input todo value:', event.target.value)
    if (event.key === "Enter") {
      addTodo(todo);
      setTodo("");
    }
  };
  const statusList = ["all", "active", "completed"];

  const showListWithStatus = (status, index) => {
    setIndexValue(index);
    showTodoWithStatus(status);
  };
  const deleteTodo = (id) => {
    console.log("delete todo:", id);
    deleteTodoItem(id);
  };
  console.log("completed todo in addtodjs:", todoList);
  const mouseSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(
    mouseSensor,
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event) => {
    onhandleDragEnd(event);
  };

  return (
    <React.Fragment>
      <div className="input-wrapper">
        <button className="add-todo"></button>
        <input
          className="todo-input"
          type="input"
          value={todo}
          onChange={onChangeTodo}
          onKeyDown={addTodoText}
          placeholder="Create a new todo"
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="todo-list">
          <SortableContext
            items={todoList}
            strategy={verticalListSortingStrategy}
            aria-pressed="false"
          >
            {todoList.map((todo) => {
              return (
                <SortableItem key={todo.id} id={todo.id}>
                  <div
                    className={`todo-list--item ${
                      todo.completed ? "completed" : " "
                    }`}
                  >
                    <label
                      htmlFor={`todo-label-${todo.id}`}
                      className="todo-label"
                    >
                      <span
                        className="todo-label--check"
                        onClick={() => changeStatus(todo.id, todo.completed)}
                      ></span>
                      <p className="todo-label--text">{todo.todoText}</p>
                    </label>
                    <button
                      className="btn-delete"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <img src={deleteIcon} alt="" />
                    </button>
                  </div>
                </SortableItem>
              );
            })}
          </SortableContext>
        </div>
      </DndContext>
      <div className="status-container">
        <div className="grid-row-wrapper">
          <div className="items-count">
            <p>{count} items left</p>
          </div>
          <div className="status-action">
            <button className="btn-status" onClick={allClearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>

        <div className="status-type list-item">
          {statusList.map((status, index) => {
            return (
              <button
                className={`btn-status ${indexValue === index ? "active" : ""}`}
                key={index}
                onClick={() => showListWithStatus(status, index)}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>
      <p className="reorder-status">Drag and drop to reorder list.</p>
    </React.Fragment>
  );
}
