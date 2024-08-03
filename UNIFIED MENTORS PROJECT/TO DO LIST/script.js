document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task-input');
  const addTaskButton = document.getElementById('add-task-button');
  const taskList = document.getElementById('task-list');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
      taskItem.innerHTML = `
        <input type='checkbox' ${task.completed ? 'checked' : ''} data-index=${index}>
        <span class='task-text'>${task.text}</span>
        <input type='text' class='edit-input' value='${task.text}' style='display: none;'>
        <button class='edit-button' data-index=${index}>Edit</button>
        <button class='delete-button' data-index=${index}>Delete</button>
      `;
      taskList.appendChild(taskItem);
    });
  };

  const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Task cannot be empty.');
      return;
    }
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  };

  const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  const editTask = (index) => {
    const taskItem = taskList.children[index];
    const editInput = taskItem.querySelector('.edit-input');
    const taskText = taskItem.querySelector('.task-text');
    if (editInput.style.display === 'none') {
      editInput.style.display = 'inline';
      taskText.style.display = 'none';
      editInput.focus();
    } else {
      tasks[index].text = editInput.value.trim();
      saveTasks();
      renderTasks();
    }
  };

  const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  addTaskButton.addEventListener('click', addTask);

  taskList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const index = e.target.dataset.index;
      toggleTaskCompletion(index);
    }
  });

  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-button')) {
      const index = e.target.dataset.index;
      editTask(index);
    } else if (e.target.classList.contains('delete-button')) {
      const index = e.target.dataset.index;
      deleteTask(index);
    }
  });

  const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long' };
    const day = now.toLocaleDateString(undefined, options);
    const formattedDate = now.toLocaleDateString();
    document.getElementById('day').textContent = day;
    document.getElementById('date').textContent = formattedDate;
  };

  renderTasks();
  updateDateTime();
  setInterval(updateDateTime, 1000);

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTaskButton.click();
    }
  });
});
