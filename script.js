// const inc =
//   (init = 0) =>
//   () =>
//     ++init;
// const genId = inc();

// const createTask = (data) => {
//   return {
//     id: genId(),
//     title: data.title,
//     done: false,
//     due_date: data.due_date || "",
//     description: data.description || "",
//   };
// };
const options = { year: "numeric", month: "numeric", day: "numeric" };
// const date1 = new Date("8/16/2021");
// const date2 = new Date("8/15/2021");
// const date3 = new Date("8/17/2021");
// const date4 = new Date("8/16/2021");

// let tasks = [
//   {
//     id: genId(),
//     title: "first task",
//     done: false,
//     due_date: date1,
//     description: "first description",
//   },
//   {
//     id: genId(),
//     title: "second task",
//     done: true,
//     due_date: date2,
//   },
//   {
//     id: genId(),
//     title: "third task",
//     done: false,
//     due_date: date3,
//     description: "third description",
//   },
//   {
//     id: genId(),
//     title: "four task",
//     done: false,
//     due_date: date4,
//   },
// ];

const check = (id) => {
  let task = tasks.find((task) => task.id == id);
  task.done = !task.done;
  document.getElementById(task.id).remove();
  createDiv(task);
};

const container = document.getElementById("container");

const createDiv = (task) => {
  let div = document.createElement("div");
  div.className = "task-style";
  div.setAttribute("id", task.id);
  div.innerHTML = createTag(task, checkDate(task.due_date));
  task.done ? container_done.append(div) : container.append(div);
};

const createTag = (task, dateTag) => {
  let taskTag;
  if (task.done) {
    taskTag = `<input type="checkbox" checked onchange="check(this.parentNode.id)"> 
         <h3 style="text-decoration: line-through; color: darkgray;">${
           task.id + "." + task.title
         }</h3> 
         <p>${task.due_date.toLocaleDateString("en-US", options) || ""}</p>
         <p method="POST" action="http://localhost:3000/tasks" class="delete-task" onclick="deleteTask(this.parentNode.id)">✖</p>`;
  } else {
    taskTag = `<input type="checkbox" onchange="check(this.parentNode.id)"> 
        <h3> ${task.id + "." + task.title}</h3> 
        ${dateTag}
        <p method="POST" action="http://localhost:3000/tasks" class="delete-task" onclick="deleteTask(this.parentNode.id)">✖</p>`;
  }

  taskTag += `<br>
    <p class="description">${task.description || ""}</p>`;

  return taskTag;
};

const deleteTask = (id) => {
  document.getElementById(id).remove();

  fetch('http://localhost:3000/' + id, {
  method: 'DELETE',
})
.then(res => res.text()) // or res.json()
.then(res => console.log(res))
};

const checkDate = (date) => {
  let dateTag;
  date = new Date(date)
  if (new Date() > date) {
    dateTag = `<p class="overdue-task">${date.toLocaleDateString(
      "en-US",
      options
    )}</p>`;
  } else if (new Date() <= date) {
    dateTag = `<p>${date.toLocaleDateString("en-US", options)}</p>`;
  } else {
    dateTag = "";
  }
  return dateTag;
};

let isOn = true;

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

// tasks.forEach((task) => {
//   createDiv(task);
// });


//===========================================//
const req = new XMLHttpRequest();

 const getTasks =  () => {
  return fetch(`http://localhost:3000/tasks`, {
    method: 'GET', 
    headers:  {
        'Content-Type': 'application/json'
    },
})
.then(response => response.json())
}

getTasks().then(data => {
  data.forEach(task => {
    createDiv(task);
  })
}
);


const form = document.getElementById("task_form");
form.addEventListener("submit", () => {
  event.preventDefault();
  const newForm = new FormData(form);
  const data = Object.fromEntries(newForm.entries());
  if (data.title) {
    data.due_date = new Date(data.due_date);
    createTaskServer(data)
    .then(data => {
      createDiv(data)
    })




    // req.open("POST", "http://localhost:3000/tasks", true);
    // req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // req.onreadystatechange = function() {//Вызывает функцию при смене состояния.
    //   if(req.readyState == XMLHttpRequest.DONE && req.status == 200) {
    //       // Запрос завершён. Здесь можно обрабатывать результат.
    //       console.log('ok')
    //   }
    // }
    // req.send(`title=${data.title}&due_date=${data.due_date || ''}&description=${data.description || ''} first task`);
  } else {
    alert("Enter the title");
  }
});

const createTaskServer = (task) => {
  return fetch(`http://localhost:3000/tasks`, {
    method: 'POST', 
    headers:  {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
})
.then(response => response.json())
}





