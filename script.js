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

//carrega as tarefas salvas no localStorage
loadTasks();

//gera um id aleatório para cada task
function generateId() {
    return Math.floor(Math.random() * 1000);
}

//cria nova task
function createTask() {

    if (taskInput.value == "" || taskInput.value == null) {
        alert("digite o nome da tarefa");
        return
    }

    let task = {
        text: taskInput.value,
        id: generateId(),
        completed: false
    }

    createTags(task);
    //salva task no localStorage
    saveTasks();

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
    checkbox.classList.add("checkTask");
    checkbox.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkbox.setAttribute('onclick', 'markTask');

    checkbox.addEventListener("click", (e) => {
        let checkedTask = newTask;
        markTask(checkbox, checkedTask);
    })

    btnContainer.appendChild(editButton);
    btnContainer.appendChild(removeButton);
    btnContainer.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(btnContainer);

    //add a tarefa criada à ul
    tasks.appendChild(newTask);
    taskInput.value = "";
}

//salva tasks no localStorage
function saveTasks() {
    //busca todos os li do html
    const taskElements = document.querySelectorAll('.task-item');
    const tasks = [];
    taskElements.forEach(taskElement => {
        const id = parseInt(taskElement.id);
        const text = taskElement.querySelector('.task-text').textContent;
        const completed = taskElement.classList.contains('line');
        tasks.push({ id, text, completed});
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//carrega as tasks salvas no localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            createTags(task);
            //verifica se completed = true (tarefa finalizada)
            //para aplicar os estilos correspondentes
            if(task.completed) {
                const taskElement = document.getElementById(task.id);
                taskElement.querySelector('.checkTask').classList.add('marked');
                taskElement.classList.add('line');
        
            }
        });
    }
}


function excludeTask(taskId) {
    //confirmacao do navegador se o usuario deseja excluir (nao aparece no live preview)
    let confirmation = window.confirm('Deseja excluir a tarefa?');

    if (confirmation) {
        let li = document.getElementById('' + taskId + '');
        if (li) {
            tasks.removeChild(li);
            saveTasks();
        } else {
            alert("Elemento HTML não encontrado");
        }
    }
}

//editar task
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

//botão add task
btnAddTask.addEventListener("click", (e) => {
    createTask();

})

//possibilita incluir a tarefa pressionando o enter
taskInput.addEventListener("keypress", (e) => {


    if (e.keyCode == CODIGO_ENTER) {

        createTask();
    }

})

//btn de fechar a janela de edicao
editBtnClose.addEventListener("click", (e) => {
    shiftEditWindow();
})

//funcao que habilita tela de edicao
function shiftEditWindow() {
    editWindow.classList.toggle('open');
    editWindowBack.classList.toggle('open');
};    

//btn salvar task após edicao
btnSaveTask.addEventListener("click", (e) => {

    e.preventDefault();
    let idTask = parseInt(idEditTask.innerHTML.replace('#', ''));
    let taskText = editInput.value;
    let currentTask = document.getElementById('' + idTask + '');

    if (currentTask) {

        let taskSpan = currentTask.querySelector('.task-text');
        
        if (taskSpan) {
            taskSpan.textContent = taskText;
            shiftEditWindow();
            saveTasks();
        }    
    }    
    
})            

//altera o estado completede da task
function markTask(btn,checkedTask) {
    btn.classList.toggle('marked');
    checkedTask.classList.toggle('line');
    checkedTask.check = true;
    saveTasks();
} 




