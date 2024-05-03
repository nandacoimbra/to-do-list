const taskInput = document.querySelector("#add-task-input");
const btnAddTask = document.querySelector(".add-task-button");
const btnCheckTask = document.querySelector(".checkTask");
const tasks = document.querySelector(".tasks");
const editWindow = document.querySelector('#edit-window');
const editWindowBack = document.querySelector('#edit-background');
const editBtnClose = document.querySelector("#edit-window-btn-close");
const btnSaveTask = document.querySelector("#btn-save-edit");
const idEditTask = document.querySelector("#id-task-edit");
const editInput = document.querySelector("#edit-window-input");
const CODIGO_ENTER = 13;


function generateId() {
    return Math.floor(Math.random() * 1000);
}

function createTask() {

    if (taskInput.value == "" || taskInput.value == null) {
        alert("digite o nome da tarefa");
        return
    }

    let task = {
        text: taskInput.value,
        id: generateId()
    }

    createTags(task);

}

function createTags(task) {

    //cria o elemnto li
    let newTask = document.createElement("li");
    newTask.classList.add("task-item");

    //atribui à nova task o id criado
    newTask.id = task.id;

    //cria o elemento span
    let taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    //cria os botoes e icones
    let editButton = document.createElement("button");
    editButton.classList.add("btn", "edit-task");
    editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editButton.setAttribute('onclick', 'editTask(' + task.id + ')');

    let removeButton = document.createElement("button");
    removeButton.classList.add("btn", "remove-task");
    removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    removeButton.setAttribute('onclick', 'excludeTask(' + task.id + ')');

    let checkbox = document.createElement("button");
    checkbox.classList.add("checkTask", "marked");
    checkbox.innerHTML = '<i class="fa-solid fa-check"></i>';

    btnContainer.appendChild(editButton);
    btnContainer.appendChild(removeButton);
    btnContainer.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(btnContainer);

    //add a tarefa criada à ul
    tasks.appendChild(newTask);
    taskInput.value = "";
}

function excludeTask(taskId) {
    let confirmation = window.confirm('Deseja excluir a tarefa?');

    if (confirmation) {
        let li = document.getElementById('' + taskId + '');
        if (li) {
            tasks.removeChild(li);
        } else {
            alert("Elemento HTML não encontrado");
        }
    }
}
function editTask(taskId) {

    let li = document.getElementById('' + taskId + '');

    if (li) {

        idEditTask.innerHTML = '#' + taskId + '';
        editInput.value = li.innerText;
        shiftEditWindow();

    } else {
        alert("Elemento HTML não encontrado");
    }
}


btnAddTask.addEventListener("click", (e) => {
    createTask();

})

taskInput.addEventListener("keypress", (e) => {

    
    if (e.keyCode == CODIGO_ENTER) {

        createTask();
    }

})

editBtnClose.addEventListener("click", (e) => {
    shiftEditWindow();
})

function shiftEditWindow() {
    editWindow.classList.toggle('open');
    editWindowBack.classList.toggle('open');
};

btnSaveTask.addEventListener("click", (e) => {
    e.preventDefault();
    let idTask = parseInt(idEditTask.innerHTML.replace('#', ''));

    let taskText = editInput.value;

    let currentTask = document.getElementById('' + idTask + '');

    if (currentTask) {

        let taskSpan = currentTask.querySelector('.task-text');

        if(taskSpan){
            taskSpan.textContent = taskText;
            shiftEditWindow();
        }
       
       
    }

})

