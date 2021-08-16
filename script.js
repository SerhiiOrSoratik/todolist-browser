let tasks = [
    {
        id: 1,
        title: "first task",
        done: false,
        due_date: "8/16/2021, 14:50",
        description: "first description"
    },
    {
        id: 2,
        title: "second task",
        done: true,
        due_date: "8/15/2021, 14:00"
    },
    {
        id: 3,
        title: "third task",
        done: false,
        due_date: "8/17/2021, 00:00",
        description: "third description"
    },
    {
        id: 4,
        title: "four task",
        done: false,
        due_date: "8/16/2021, 8:00",
    },
];

const check = (id) => {
    let task = tasks.find(task => task.id == id);
    task.done = !task.done;
    document.getElementById(task.id).remove();
    createDiv(task)
} 

const container = document.getElementById('container');

const createDiv = (task) => {
    let div = document.createElement('div');
    div.className = "task-style";
    div.setAttribute("id", task.id);
    div.innerHTML = createTag(task, checkDate(task.due_date));
    task.done ? container_done.append(div) : container.append(div); 
}

const createTag = (task, dateTag) => {
    let taskTag;
    if (task.done) {
         taskTag = `<input type="checkbox" checked onchange="check(this.parentNode.id)"> 
         <h3 style="text-decoration: line-through; color: darkgray;">${task.id + '.' + task.title}</h3> 
         <p>${task.due_date || '' }</p>
         <p class="delete-task" onclick="deleteTask(this.parentNode.id)">✖</p>`;
    }
    else {
        taskTag = `<input type="checkbox" onchange="check(this.parentNode.id)"> 
        <h3> ${task.id + '.' + task.title}</h3> 
        ${dateTag}
        <p class="delete-task" onclick="deleteTask(this.parentNode.id)">✖</p>`
    }

    taskTag += `<br>
    <p class="description">${task.description || ''}</p>`;

    return taskTag;
}

const deleteTask = (id) => {
    document.getElementById(id).remove();
    tasks.splice(id, 1);
}

const checkDate = (date) => {
    let dateTag;
    if (new Date() >= new Date(date)) {
        dateTag = `<p class="overdue-task">${date}</p>`;
    }
    else if (new Date() < new Date(date)) {
        dateTag = `<p>${date}</p>`;
    }
    else {
        dateTag = '';
    }
    return dateTag;
}

let isOn = true;

const collapseTab = () => {
    const container = document.getElementById('container_done');
    const doneTaskH = document.getElementById('done_task');
    if (isOn) {
        doneTaskH.innerHTML = 'Done task+';
        container.style.display = 'none';
    }
    else {
        doneTaskH.innerHTML = 'Done task-';
        container.style.display = '';
    }
    isOn = !isOn;
}

tasks.forEach(task => {
    createDiv(task);
})
