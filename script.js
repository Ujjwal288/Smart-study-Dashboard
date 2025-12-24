let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");

    if (taskInput.value === "" || dateInput.value === "") {
        alert("Please enter task and deadline");
        return;
    }

    tasks.push({
        text: taskInput.value,
        date: dateInput.value,
        completed: false
    });

    taskInput.value = "";
    dateInput.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info">
                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
                <span class="deadline">📅 ${task.date}</span>
            </div>
            <input type="checkbox" ${task.completed ? "checked" : ""} 
            onclick="toggleTask(${index})">
        `;

        taskList.appendChild(li);
    });

    updateProgress();
}

function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    document.getElementById("progressText").innerText = `Progress: ${progress}%`;
    document.getElementById("progressFill").style.width = progress + "%";
}

renderTasks();
