    const inputBox = document.getElementById("name");
    const listContainer = document.getElementById("list-container");

    let tasks = [];

    let isEdit = false;
    let editId = 0;

    function renderTasks() {
      listContainer.innerHTML = tasks.map(task => `
        <li>
          <label>
            <span>${task.name}</span>
          </label>
          <span onclick="editRow(${task.id})" class="edit-btn">Edit</span>
          <span onclick="deleteRow(${task.id})" class="delete-btn">Delete</span>
        </li>
      `).join('');
    }

    function addTask() {
      const name = inputBox.value.trim();

      if (!name) {
        alert("Please write down a task");
        return;
      }

      if (isEdit) {
        const index = tasks.findIndex(task => task.id === editId);
        if (index !== -1) {
          tasks[index].name = name;
        }
        isEdit = false;
        editId = 0;
      } else {
        const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
        tasks.push({ id, name });
      }

      inputBox.value = "";
      renderTasks();
    }

    function editRow(id) {
      const task = tasks.find(task => task.id === id);
      if (task) {
        inputBox.value = task.name;
        editId = id;
        isEdit = true;
      }
    }

    function deleteRow(id) {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    }

    inputBox.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });

    renderTasks();