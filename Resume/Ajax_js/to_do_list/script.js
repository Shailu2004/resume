const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.getElementById('todoForm').addEventListener('submit', addTask);
window.onload = loadTasks;

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(showTask);
}


function addTask(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  const task = { id: Date.now(), text };
  updateLocal(task, 'add');
  showTask(task);
  taskInput.value = '';
}

function showTask(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${task.text} 
    <button onclick="editTask(${task.id})">Edit</button>
    <button onclick="deleteTask(${task.id})">Delete</button>
  `;
  li.dataset.id = task.id;
  taskList.appendChild(li);
}

function editTask(id) {
  const newText = prompt('Edit task:');
  if (!newText) return;
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(t => { if (t.id === id) t.text = newText; });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  fetch('edit', { method: 'POST' }); // dummy
  document.querySelector(`li[data-id='${id}']`).childNodes[0].nodeValue = newText + ' ';
}

function deleteTask(id) {
  if (!confirm('Delete task?')) return;
  const tasks = (JSON.parse(localStorage.getItem('tasks')) || []).filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  fetch('delete', { method: 'POST' }); 
  document.querySelector(`li[data-id='${id}']`).remove();
}

function updateLocal(task, type) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (type === 'add') tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  fetch('save', { method: 'POST' }); 
}
