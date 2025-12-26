let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const task = taskInput.value;
    const date = dateInput.value;
    const priority = priorityInput.value;

    if (!task || !date) {
        alert("Please fill all fields");
        return;
    }

    tasks.push({ task, date, priority, completed: false });
    saveTasks();
    taskInput.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((t, i) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info">
                <span class="${t.completed ? "completed" : ""}">${t.task}</span>
                <span class="deadline">📅 ${t.date}</span>
                <span class="badge ${t.priority}">${t.priority}</span>
            </div>
            <input type="checkbox" ${t.completed ? "checked" : ""} onclick="toggleTask(${i})">
        `;

        taskList.appendChild(li);
    });

    updateProgress();
}

function updateProgress() {
    const completed = tasks.filter(t => t.completed).length;
    const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

    progressText.innerText = `${percent}% Completed`;
    progressFill.style.width = percent + "%";
}

renderTasks();
