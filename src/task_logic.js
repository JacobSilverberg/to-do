import {createElement, createImage} from "./create_element";
import { displayTasks } from "./layout";

let toDoList = []
let editIndex = null

function checkLocalStorage() {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            toDoList.push(JSON.parse(localStorage.getItem(i)));
        }
        displayTasks(toDoList);
        applyTaskListeners();
    }     
}

function displayAddTaskForm() {
    document.getElementById('add-task-container').style.display = 'block';
}

function hideAddTaskForm() {
    document.getElementById('add-task-container').style.display = 'none';
    resetAddTask();
}

function displayEditTaskForm() {
    document.getElementById('edit-task-container').style.display = 'block';
}

function hideEditTaskForm() {
    document.getElementById('edit-task-container').style.display = 'none';
    resetEditTask();
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function updateLocalStorage() {
    localStorage.clear();
    for (let i = 0; i < toDoList.length; i++) {
        localStorage.setItem(i, JSON.stringify(toDoList[i]));
    }
}

function resetAddTask() {
    document.getElementById('task-title').value = "";
    document.getElementById('task-details').value = "";
    document.getElementById('task-date').value = "";
}

function resetEditTask() {
    document.getElementById('edit-task-title').value = "";
    document.getElementById('edit-task-details').value = "";
    document.getElementById('edit-task-date').value = "";
}

function applyTaskListeners() {
    document.querySelectorAll('[id^=editing-task]').forEach((button) => {
        button.addEventListener('click', editTask);
    });
    document.querySelectorAll('[id^=delete-task]').forEach((button) => {
        button.addEventListener('click', deleteTask);
    });
    document.querySelector('#add-button').addEventListener('click', displayAddTaskForm);
    document.querySelector('#task-submit').addEventListener('click', addTask);
    document.querySelector('#edit-task-submit').addEventListener('click', editTaskSubmit);
    document.querySelector('#add-task-close').addEventListener('click', hideAddTaskForm);
    document.querySelector('#edit-task-close').addEventListener('click', hideEditTaskForm);
}

function addTask() {
    let taskDict = {};
    taskDict['task-title'] = document.getElementById('task-title').value;
    if (document.getElementById('task-details').value) {
        taskDict['task-details'] = document.getElementById('task-details').value;
    };
    taskDict['task-date'] = document.getElementById('task-date').value;
    
    toDoList.push(taskDict);
    saveToLocalStorage((toDoList.length - 1), taskDict);
    hideAddTaskForm();
    displayTasks(toDoList);
    resetAddTask();
    applyTaskListeners();
}

function editTask() {
    editIndex = this.id.split('k-').pop();
    displayEditTaskForm();
    document.getElementById('edit-task-title').value = toDoList[editIndex]['task-title'];
    document.getElementById('edit-task-details').value = toDoList[editIndex]['task-details'];
    document.getElementById('edit-task-date').value = toDoList[editIndex]['task-date'];
    return;
}

function editTaskSubmit() {
    let taskDict = {};
    taskDict['task-title'] = document.getElementById('edit-task-title').value;
    if (document.getElementById('edit-task-details').value) {
        taskDict['task-details'] = document.getElementById('edit-task-details').value;
    };
    taskDict['task-date'] = document.getElementById('edit-task-date').value;
    
    saveToLocalStorage(editIndex, taskDict);
    toDoList[editIndex] = taskDict;
    hideEditTaskForm();
    displayTasks(toDoList);
    applyTaskListeners();
}

function deleteTask() {
    let index = parseInt(this.id.split('k-').pop());
    toDoList.splice(index, 1);
    localStorage.removeItem(index);
    updateLocalStorage();
    displayTasks(toDoList);
    applyTaskListeners();
}

export {addTask, displayAddTaskForm, deleteTask, editTaskSubmit, checkLocalStorage, toDoList};