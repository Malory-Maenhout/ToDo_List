import { updateDatas } from "../service/fetch.js";

const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-second-lane");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");
        const spanElem = document.getElementById('invisible');
        const taskId = curTask.id;
        const status = spanElem.textContent;
        const zoneId = zone.id;

        if (!bottomTask) { 
            if(zoneId === "taskListDoing" && status === "todo"){
                spanElem.textContent = "doing";
                zone.appendChild(curTask);
            }else if (zoneId === "taskListTodo" && status === "doing"){
                spanElem.textContent = "todo";
                zone.appendChild(curTask);
            } else if (zoneId === "taskListDone" && status === "doing") {
                spanElem.textContent = "done";
                zone.appendChild(curTask);
            } else if (zoneId === "taskListDoing" && status === "done") {
                spanElem.textContent = "doing";
                zone.appendChild(curTask);
            }
        } else {
            zone.insertBefore(curTask, bottomTask);
        }
        
        updateDatas(taskId, status);
    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};