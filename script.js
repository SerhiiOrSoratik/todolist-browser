const options = { year: "numeric", month: "numeric", day: "numeric" };
const container = document.getElementById("container");
let isOn = true;

const createDiv = (task) => {
  let div = document.createElement("div");
  div.className = "task-style";
  div.setAttribute("id", task.id);
  div.innerHTML = createTag(task, checkDate(task.due_date, task.done));
  task.done ? container_done.append(div) : container.append(div);
};

const createTag = (task, dateTag) => {
  let taskTag;
  if (task.done) {
    taskTag = `<input type="checkbox" checked onchange="changeTaskCondition(this.parentNode.id)"> 
         <h3 style="text-decoration: line-through; color: darkgray;">${task.id + '.' + task.title}</h3> 
         ${dateTag}
         <p method="POST" action="http://localhost:3000/tasks" class="delete-task" onclick="deleteTask(this.parentNode.id)">✖</p>`;
  } else {
    taskTag = `<input type="checkbox" onchange="changeTaskCondition(this.parentNode.id)"> 
        <h3> ${task.id + "." + task.title}</h3> 
        ${dateTag}
        <p method="POST" action="http://localhost:3000/tasks" class="delete-task" onclick="deleteTask(this.parentNode.id)">✖</p>`;
  }

  taskTag += `<br>
  <p class="description">${task.description || ''}</p>`;
  return taskTag;
};

const checkDate = (date, done) => {
  let dateTag;
  if (date !== null) {
    date = new Date(date);
    let nowDay = new Date();
    nowDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate(), 0, 0, 0, 0);
    if (nowDay >= date && done == false) {
      dateTag = `<p class="overdue-task">${date.toLocaleDateString("en-US", options) || ''}</p>`;
    } else if (nowDay < date || done == true) {
      dateTag = `<p>${date.toLocaleDateString("en-US", options) || ''}</p>`;
    }
    return dateTag;
  } else return '';
};

const collapseTab = () => {
  const container = document.getElementById("container_done");
  const doneTaskH = document.getElementById("done_task");
  if (isOn) {
    doneTaskH.innerHTML = "Done task+";
    container.style.display = "none";
  } else {
    doneTaskH.innerHTML = "Done task-";
    container.style.display = "";
  }
  isOn = !isOn;
};

const getTasks = () => {
  return fetch(`http://localhost:3000/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

getTasks().then((data) => {
  data.forEach((task) => {
    createDiv(task);
  });
});

const form = document.getElementById("task_form");
form.addEventListener("submit", () => {
  event.preventDefault();
  const newForm = new FormData(form);
  const data = Object.fromEntries(newForm.entries());
  if (data.title) {
    data.due_date = new Date(data.due_date);
    createTaskServer(data).then((data) => {
      createDiv(data);
    });
  } else {
    alert("Enter the title");
  }
});

const createTaskServer = (task) => {
  return fetch(`http://localhost:3000/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => response.json());
};

const changeTaskCondition = (id) => {
  document.getElementById(id).remove();
  changeTaskConditionServer(id).then((data) => {
    createDiv(data[0]);
  });
};

const changeTaskConditionServer = (id) => {
  return fetch("http://localhost:3000/tasks/" + id, {
    method: "PATCH",
  }).then((response) => response.json());
};

const deleteTask = (id) => {
  document.getElementById(id).remove();
  return fetch("http://localhost:3000/tasks/" + id, {
    method: "DELETE",
  });
};
