import { createDatas } from "../service/fetch.js";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("taskListTodo");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;

    if (!value) return;

    createDatas(input.value);

    const newTask = document.createElement("p");
    const newSpan = document.createElement("span");

    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;

    newSpan.innerText = "todo";
    newSpan.id = 'invisible';

    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });

    newTask.appendChild(newSpan);
    todoLane.appendChild(newTask);

    input.value = "";
});