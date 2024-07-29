const inputBox = document.getElementById("name");
const dateTimeBox = document.getElementById("datetime");
const listContainer = document.getElementById("list-container");
const inputButton = document.getElementById("input-button");

let myArr = localStorage.getItem("tasks");
let tasks = myArr ? JSON.parse (myArr): [];
let isEdit = false;
let editId = 0;

function formatDateTime(datetime) {
  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };

  const date = new Date(datetime);
  return `${date.toLocaleDateString(undefined, optionsDate)}
   ${date.toLocaleTimeString(undefined, optionsTime)}`;
}

function renderTasks() {
  const myJson = JSON.stringify(tasks);
  localStorage.setItem("tasks", myJson);
  listContainer.innerHTML = tasks.map( (task) => `
    <li>
      <label>
        <span>${task.name}</span>
        <span>${formatDateTime(task.datetime)}</span>
      </label>
      <span onclick="editRow(${task.id})" class="edit-btn">Edit</span>
      <span onclick="deleteRow(${task.id})" class="delete-btn">Delete</span>
    </li>
  `
    )
    .join("");
}

function addTask() {
  const name = inputBox.value.trim();
  const datetime = dateTimeBox.value.trim();

  if (!name || !datetime) {
    alert("Please write down a task and select a date and time");
    return;
  }

  if (isEdit) {
    const index = tasks.findIndex((task) => task.id === editId);
    if (index !== -1) {
      tasks[index].name = name;
      tasks[index].datetime = datetime;
    }
    isEdit = false;
    editId = 0;
    inputButton.textContent = "Add";
  } else {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    tasks.push({ id, name, datetime });
  }

  inputBox.value = "";
  dateTimeBox.value = "";
  renderTasks();
}

function editRow(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    inputBox.value = task.name;
    dateTimeBox.value = task.datetime;
    editId = id;
    isEdit = true;
    inputButton.textContent = "Edit";
  }
}

function deleteRow(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
