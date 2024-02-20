window.addEventListener('load', () => {
    const form = document.querySelector("#new-task");
    const input = document.querySelector("#new-input");
    const list_element = document.querySelector("#tasks");
    let tasks = [];

    // Load tasks from localStorage on page load
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            renderTask(task);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert('Please fill in your task');
            return;
        }

        // Add task to tasks array
        tasks.push(task);
        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Render task
        renderTask(task);

        input.value = "";
    });

    function renderTask(taskText) {
        const task_element = document.createElement("div");
        task_element.classList.add("task");

        const task_content_element = document.createElement("div");
        task_content_element.classList.add("content");

        task_element.appendChild(task_content_element);

        const task_input_element = document.createElement("input");
        task_input_element.classList.add("text");
        task_input_element.type = "text";
        task_input_element.value = taskText;
        task_input_element.setAttribute("readonly", "readonly");

        task_content_element.appendChild(task_input_element);

        const task_actions_element = document.createElement("div");
        task_actions_element.classList.add("actions");

        const task_edit_element = document.createElement("button");
        task_edit_element.classList.add("edit");
        task_edit_element.innerHTML = "Edit";

        const task_delete_element = document.createElement("button");
        task_delete_element.classList.add("delete");
        task_delete_element.innerHTML = "Delete";

        task_actions_element.appendChild(task_edit_element);
        task_actions_element.appendChild(task_delete_element);

        task_element.appendChild(task_actions_element);

        list_element.appendChild(task_element);

        task_edit_element.addEventListener('click', () => {
            if (task_edit_element.innerText.toLowerCase() == "edit") {
                task_input_element.removeAttribute("readonly");
                task_input_element.focus();
                task_edit_element.innerText = "Save";
            } else {
                task_input_element.setAttribute("readonly", "readonly");
                task_edit_element.innerText = "Edit";
                updateTask(task_input_element.value, taskText);
            }
        });

        task_delete_element.addEventListener('click', () => {
            list_element.removeChild(task_element);
            deleteTask(taskText);
        });
    }

    function updateTask(updatedTask, oldTask) {
        const index = tasks.indexOf(oldTask);
        if (index !== -1) {
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function deleteTask(task) {
        const index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
});
