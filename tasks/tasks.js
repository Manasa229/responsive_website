


var todo = document.getElementsByClassName("todo-list")[0];
var updated = document.getElementsByClassName("inprogress-list")[0];
var completed = document.getElementsByClassName("completed-list")[0];
var selectedTask;
var selectedTaskId;
var tasks = [];


// getMockData();
getTasks();

async function loadJsonData(data) {

    data.tasks.filter(task => task.status == 'pending').forEach(task => {
        createTask(todo, task);
    });

    data.tasks.filter(task => task.status == 'updated').forEach(task => {
        createTask(updated, task);
    });

    data.tasks.filter(task => task.status == 'completed').forEach(task => {
        createTask(completed, task);
    });

}

function createTask(container, task) {
    var div = document.createElement("div");
    div.className = "task";
    div.innerText = task.name;
    div.id = task.id;

    div.addEventListener('click', function () {
        selectTask(div, task.id);
    });

    container.appendChild(div);
}

function addTask() {

    var taskinput = document.getElementsByClassName("input-text")[0].value;
    let task = {
        id: tasks.length + 1,
        name: taskinput,
        status: "pending"
    }
    tasks.push(task);
    createTask(todo, task);
    showToast("success", "Task added successfully");
    document.getElementsByClassName("input-text")[0].value = "";
}

async function getMockData() {
    let response = await fetch("tasks.json");
    let data = await response.json();
    loadJsonData(data);
}

async function getTasks() {
    try {
        var response = await fetch('http://demo1839380.mockable.io/tasks')
        var data = await response.json();
        tasks = data.tasks;
        loadJsonData(data);
    } catch (error) {

        showToast("error", error.message);

    }
}

function showToast(type, message) {
    let color = "green";
    if (type == "error") {
        color = "red";
    }
    var toast = document.getElementsByClassName("toast")[0];
    toast.style.visibility = "visible";
    toast.style.backgroundColor = color;
    toast.innerText = message;

    setTimeout(function () {
        toast.style.visibility = "hidden"
    }, 5000)
}

function selectTask(div, id) {
    div.style.backgroundColor = "white";
    div.style.color = "black";
    selectedTask = tasks.filter(task => task.id == id)[0];
    selectedTaskId = id;
}


function moveToLeft() {

    if (selectedTask.status == "pending") {
        showToast("error", "Cannot move to left")
    } else {
        var status;
        removeTask();
        if (selectedTask.status == "updated") {
            status = "pending";
            createTask(todo, selectedTask);
        } else if (selectedTask.status == "completed") {
            status = "updated";
            createTask(updated, selectedTask);
        }
        selectedTask.status = status;
        showToast("success", "Moved to left successfully")
    }


}

function moveToRight() {
    if (selectedTask.status == "completed") {
        showToast("error", "Cannot move to right")
    } else {
        var status;
        removeTask();
        if (selectedTask.status == "updated") {
            status = "completed";
            createTask(completed, selectedTask);
        } else if (selectedTask.status == "pending") {
            status = "updated";
            createTask(updated, selectedTask);
        }
        
        selectedTask.status = status;
      
        showToast("success", "Moved to right successfully")
    }


}

function removeTask() {
    var selectedDiv = document.getElementById(selectedTaskId);
    selectedDiv.parentElement.removeChild(selectedDiv);
}