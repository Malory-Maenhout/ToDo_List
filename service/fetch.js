const baseUrl = "http://localhost:8000/todos";

export async function getDatas() {
    const taskListToDo = document.getElementById("taskListTodo");
    const taskListDoing = document.getElementById("taskListDoing");
    const taskListDone = document.getElementById("taskListDone");

    let taskDatas = []; 
    const URL = `${baseUrl}`;
    const response = await fetch(URL);
    taskDatas = await response.json();

    taskListToDo.innerHTML = "";
    taskListDoing.innerHTML = "";
    taskListDone.innerHTML = "";
    taskDatas.forEach((taskData) => {
        const p = document.createElement("p");
        const s = document.createElement("span");

        p.id = taskData.id;
        p.classList.add("task");
        p.setAttribute("draggable", "true");
        p.innerText = taskData.title;

        p.addEventListener("dragstart", () => {
            p.classList.add("is-dragging");
        });
    
        p.addEventListener("dragend", () => {
            p.classList.remove("is-dragging");
        });

        s.innerText = taskData.status;
        s.id = 'invisible';

        p.appendChild(s);

        switch(taskData.status){
            case "todo":
                taskListToDo.appendChild(p);
                break;
            case "doing":
                    taskListDoing.appendChild(p);
                    break;
            case "done":
                taskListDone.appendChild(p);
                break;
        }
    });
};

export async function createDatas(title) {
    const newTask = {
        "title" : `${title}`
    }

    const requestOptions = {
        method: 'POST',
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify(newTask),
        mode: 'no-cors'
    };

    const URL = `${baseUrl}`;
    const response = await fetch(URL, requestOptions);
}

export async function updateDatas(id, status) {
    const updateTask = {
        "status" : `${status}`
    }

    const requestOptions = {
        method: 'PUT',
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify(updateTask)
    };

    const URL = `${baseUrl}?id=${id}`;
    const response = await fetch(URL, requestOptions);
}