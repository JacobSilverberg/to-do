import {createElement, createImage} from "./create_element";
import { displayProjectsSidebar, displaySelectedProject, displayTasks, displayTasksToday, displayTasksWeek, populateProjectDropdown } from "./layout";

let toDoList = [];
let projectList = [];
let editIndex = null;

function checkLocalStorage() {
    if (localStorage.length == 0) {
        saveToLocalStorage('projects', []);
    }
    else if (localStorage.length >= 1) {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(i) == null) {
                projectList = JSON.parse(localStorage.getItem('projects'));
            } 
            else {
                toDoList.push(JSON.parse(localStorage.getItem(i)));
            }
        }
        displayTasks(toDoList);
    }
    applyTaskListeners();
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

function displayAddProjectForm() {
    document.getElementById('add-project-form-container').style.display = 'block';
}

function hideAddProjectForm() {
    document.getElementById('add-project-form-container').style.display = 'none';
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function updateLocalStorage() {
    localStorage.clear();
    for (let i = 0; i < toDoList.length; i++) {
        localStorage.setItem(i, JSON.stringify(toDoList[i]));
    }
    localStorage.setItem('projects', JSON.stringify(projectList));
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

    document.querySelector('#home').addEventListener('click', displayTasks);
    document.querySelector('#today').addEventListener('click', displayTasksToday);
    document.querySelector('#week').addEventListener('click', displayTasksWeek);

    document.querySelectorAll('.project-title').forEach((project) => {
        project.addEventListener('click', displaySelectedProject);
    });
    document.querySelectorAll('.delete-project-icon').forEach((project) => {
        project.addEventListener('click', deleteProject);
    });
    document.querySelector('.new-project-container').addEventListener('click', displayAddProjectForm)
    document.querySelector('#add-project-submit').addEventListener('click', addProject);
}

function addTask() {
    let taskDict = {};
    taskDict['task-title'] = document.getElementById('task-title').value;
    if (document.getElementById('task-details').value) {
        taskDict['task-details'] = document.getElementById('task-details').value;
    };
    taskDict['task-project'] = document.getElementById('task-project-selector').value;
    taskDict['task-date'] = document.getElementById('task-date').value;

    if (taskDict['task-title'] == "" || taskDict['task-date'] == "") {
        alert('Please fill out all required fields.');
        return false;
    }
    
    toDoList.push(taskDict);
    saveToLocalStorage((toDoList.length - 1), taskDict);
    hideAddTaskForm();
    displayTasks();
    resetAddTask();
    applyTaskListeners();
}

function editTask() {
    editIndex = this.id.split('k-').pop();
    displayEditTaskForm();
    document.getElementById('edit-task-title').value = toDoList[editIndex]['task-title'];
    if (toDoList[editIndex]['task-details'] == undefined) {
        document.getElementById('edit-task-details').value = "";
    } else {
        document.getElementById('edit-task-details').value = toDoList[editIndex]['task-details'];
    }
    document.getElementById('edit-task-project-selector').value = toDoList[editIndex]['task-project']
    document.getElementById('edit-task-date').value = toDoList[editIndex]['task-date'];
    return;
}

function editTaskSubmit() {
    let taskDict = {};
    taskDict['task-title'] = document.getElementById('edit-task-title').value;
    if (document.getElementById('edit-task-details').value) {
        taskDict['task-details'] = document.getElementById('edit-task-details').value;
    };
    taskDict['task-project'] = document.getElementById('edit-task-project-selector').value;
    taskDict['task-date'] = document.getElementById('edit-task-date').value;
    
    saveToLocalStorage(editIndex, taskDict);
    toDoList[editIndex] = taskDict;
    hideEditTaskForm();
    displayTasks();
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

function addProject() {
    let projectName = document.getElementById('add-project-input').value;

    if (projectName == "") {
        alert('Please enter a project name.');
        return false;
    }
    
    projectList.push(projectName);
    localStorage.setItem('projects', JSON.stringify(projectList));
    hideAddProjectForm();
    displayProjectsSidebar();
    applyTaskListeners();
    populateProjectDropdown();
}

function deleteProject() {
    console.log(this.parentElement.firstChild.textContent);
    let projDelete = this.parentElement.firstChild.textContent;
    let projIndex = projectList.indexOf(projDelete);
    console.log(projIndex);
    if (projIndex > -1) {
        projectList.splice(projIndex, 1);
    }
    updateLocalStorage();
    displayProjectsSidebar();
    applyTaskListeners();
    populateProjectDropdown();
}

export {addTask, displayAddTaskForm, deleteTask, editTaskSubmit, checkLocalStorage, applyTaskListeners, toDoList, projectList};