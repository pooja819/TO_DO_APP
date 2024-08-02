document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));

    // Add task event
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = { text: taskText, completed: false };
            tasks.push(task);
            renderTask(task);
            saveTasks();
            taskInput.value = '';
        } else {
            alert('Task cannot be empty!');
        }
    });

    // Render task
    function renderTask(task) {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
                <button class="complete-button">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;

        // Append to the appropriate list
        if (task.completed) {
            completedList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }

        // Edit task event
        li.querySelector('.edit-button').addEventListener('click', () => {
            const newTaskText = prompt('Edit task', task.text);
            if (newTaskText !== null) {
                task.text = newTaskText;
                li.querySelector('span').textContent = task.text;
                saveTasks();
            }
        });

        // Delete task event
        li.querySelector('.delete-button').addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            li.remove();
            saveTasks();
        });

        // Complete task event
        li.querySelector('.complete-button').addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed', task.completed);
            li.querySelector('.complete-button').textContent = task.completed ? 'Undo' : 'Complete';

            // Move task to the appropriate list
            if (task.completed) {
                completedList.appendChild(li);
            } else {
                todoList.appendChild(li);
            }

            saveTasks();
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});