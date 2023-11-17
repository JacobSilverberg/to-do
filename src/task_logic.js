import {createElement, createImage} from "./create_element";
import { displayTasks } from "./layout";

let toDoList = []
let editIndex = null

function displayAddTaskForm() {
    document.getElementById('add-task-container').style.display = 'block';
}

function hideAddTaskForm() {
    document.getElementById('add-task-container').style.display = 'none';
}

function displayEditTaskForm() {
    document.getElementById('edit-task-container').style.display = 'block';
}

function hideEditTaskForm() {
    document.getElementById('edit-task-container').style.display = 'none';
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

function applyTaskListeners() {
    document.querySelectorAll('[id^=editing-task]').forEach((button) => {
        button.addEventListener('click', editTask);
    });
    document.querySelectorAll('[id^=delete-task]').forEach((button) => {
        button.addEventListener('click', deleteTask);
    });
}

function editTask() {
    console.log(this.id);
    let index = this.id.split('k-').pop();
    editIndex = index;
    displayEditTaskForm();
    document.getElementById('edit-task-title').value = toDoList[editIndex]['task-title'];
    document.getElementById('edit-task-details').value = toDoList[editIndex]['task-details'];
    document.getElementById('edit-task-date').value = toDoList[editIndex]['task-date'];
    return;
}

function editTaskSubmit() {
    console.log(editIndex);

    let taskDict = {};
    taskDict['task-title'] = document.getElementById('edit-task-title').value;
    if (document.getElementById('edit-task-details').value) {
        taskDict['task-details'] = document.getElementById('edit-task-details').value;
    };
    taskDict['task-date'] = document.getElementById('edit-task-date').value;


    console.log(taskDict);

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

export {addTask, displayAddTaskForm, deleteTask, editTaskSubmit, toDoList};