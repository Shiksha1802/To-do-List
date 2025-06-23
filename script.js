
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  renderTask(task);
  input.value = "";
}

function renderTask(task) {
  const ul = document.getElementById("task-list");

  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleComplete(${task.id})">${task.text}</span>
    <div class="task-controls">
      <button class="edit" onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Del</button>
    </div>
  `;

  ul.appendChild(li);
}

function toggleComplete(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  saveTasks(tasks);
  refreshUI();
}

function editTask(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit your task:", task.text);

  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks(tasks);
    refreshUI();
  }
}

function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
  refreshUI();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(renderTask);
}

function refreshUI() {
  document.getElementById("task-list").innerHTML = "";
  loadTasks();
}
