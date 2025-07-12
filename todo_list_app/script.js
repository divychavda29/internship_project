const addBtn = document.getElementById("add-task-btn"); 
const taskInput = document.getElementById("task-input"); 
const taskList = document.getElementById("task-list");

function saveTasks() { const tasks = []; document.querySelectorAll("#task-list li").forEach((li) => { tasks.push({ text: li.childNodes[0].textContent.trim(), completed: li.classList.contains("completed") }); }); localStorage.setItem("tasks", JSON.stringify(tasks)); }

function loadTasks() { const saved = JSON.parse(localStorage.getItem("tasks")) || []; saved.forEach((task) => { createTask(task.text, task.completed); }); }

function createTask(text, completed = false) { const li = document.createElement("li"); li.textContent = text;

if (completed) { li.classList.add("completed"); }

li.addEventListener("click", () => { li.classList.toggle("completed"); saveTasks(); });

const deleteBtn = document.createElement("button"); deleteBtn.textContent = "❌"; deleteBtn.style.marginLeft = "10px"; deleteBtn.addEventListener("click", (e) => { e.stopPropagation(); taskList.removeChild(li); saveTasks(); });

const editBtn = document.createElement("button"); editBtn.textContent = "✏️"; editBtn.style.marginLeft = "10px"; editBtn.addEventListener("click", (e) => { e.stopPropagation(); const newText = prompt("Edit your task:", li.childNodes[0].textContent.trim()); if (newText !== null && newText.trim() !== "") { li.childNodes[0].textContent = newText.trim(); saveTasks(); } });

li.appendChild(deleteBtn); li.appendChild(editBtn); taskList.appendChild(li); }

addBtn.addEventListener("click", () => { const taskText = taskInput.value.trim(); if (taskText === "") { alert("Please enter a task!"); return; }

createTask(taskText); taskInput.value = ""; saveTasks(); });

loadTasks();