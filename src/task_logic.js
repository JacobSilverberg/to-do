import {createElement, createImage} from "./create_element";
import { displayTasks } from "./layout";

let toDoList = []

function displayAddTaskForm() {
    document.getElementById('add-task-container').style.display = 'block';
}

function hideAddTaskForm() {
    document.getElementById('add-task-container').style.display = 'none';
}

function saveToLocalStorage() {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
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
    saveToLocalStorage();
    hideAddTaskForm();
    displayTasks(toDoList);
    resetAddTask();
    applyTaskListeners();
}

function applyTaskListeners() {
    console.log(`edit-task-${toDoList.length - 1}`);
    document.querySelectorAll('[id^=edit-task]').forEach((button) => {
        button.addEventListener('click', editTask);
    });
    document.querySelectorAll('[id^=delete-task]').forEach((button) => {
        button.addEventListener('click', deleteTask);
    });
}

function editTask() {
    console.log(this.id);
}

function deleteTask() {
    console.log(this.id);
}

export {addTask, displayAddTaskForm, deleteTask, editTask, toDoList};