let tasks = [
    {
        id: 1,
        title: "first task",
        done: false,
        due_date: "2021-08-13",
        description: "first description"
    },
    {
        id: 2,
        title: "second task",
        done: true,
        due_date: "2021-08-14"
    },
    {
        id: 3,
        title: "third task",
        done: false,
        due_date: "2021-08-12",
        description: "third description"
    },
];

const check = (id) => {
    console.log(id)
    console.log(tasks)
    let task = tasks.find(task => task.id == id);
    console.log(task)
    task.done = !task.done;
    document.getElementById(task.id).remove();
    createDiv(task[id - 1])

} 

const createDiv = (task) => {
    let div = document.createElement('div');
    div.className = "task-style"
    div.setAttribute("id", task.id);
    let taskTag
    if (task.done) {
         taskTag = `<input type="checkbox" checked onchange="check(this.parentNode.id)" style="display: inline-block;"> 
         <h3 style="display: inline-block; text-decoration: line-through; color: darkgray;">${task.id + '.' + task.title}</h3> 
         <p style="display: inline-block">${task.due_date || '' }</p>
         <p style="color: darkgray; margin-top: 0; margin-bottom: 18px">${task.description || ''}</p>`;
    }
    else {
        taskTag = `<input type="checkbox" onchange="check(this.parentNode.id)" style="display: inline-block;"> 
        <h3 style="display: inline-block"> ${task.id + '.' + task.title}</h3> 
        <p style="display: inline-block">${task.due_date || '' }</p>
        <p style="color: darkgray; margin-top: 0; margin-bottom: 18px">${task.description || ''}</p>`;
    }

    div.innerHTML = taskTag;
    let container = document.getElementById('container');
    document.body.append(div);
    container.append(div);
}

createDiv(tasks[0]);
createDiv(tasks[1]);
createDiv(tasks[2]);
