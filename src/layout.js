import {createElement, createImage} from './create_element';
import { toDoList, deleteTask, editTask } from './task_logic';
import Add from './add.svg';
import Edit from "./edit.svg";
import Delete from "./delete.svg";

function createHeader() {
    const headerContainer = createElement('div', null, document.querySelector('#content'), {"class": "header-container"});
    const headerText = createElement('h1', 'Header Text Here', headerContainer);
}

function createSidebar() {
    const sidebarContainer = createElement('div', null, document.querySelector('#content'), {"class": "sidebar-container"});
    const homeText = createElement('h1', 'Home', sidebarContainer, {"class": "home"});
    const todayText = createElement('h1', 'Today', sidebarContainer, {"class": "today"});
    const weekText = createElement('h1', 'Week', sidebarContainer, {"class": "week"});
    const projectsText = createElement('h1', 'Projects', sidebarContainer, {"class": "projects"});

    const addButton = new Image();
    addButton.src = Add;
    addButton.setAttribute('id', 'add-button');
    sidebarContainer.appendChild(addButton);
}

function createMain() {
    const mainContainer = createElement('div', null, document.querySelector('#content'), {"class": "main-container"});
    const taskContainer = createElement('div', null, mainContainer, {'class': 'task-container'})
}

function addTaskForm() {
    const addTaskContainer = createElement('div', null, document.querySelector('.main-container'), {'class': 'add-task-container', 'id': 'add-task-container'});

    const addTaskTitleLabel = createElement('label', 'Title:', addTaskContainer, {'class': 'task-label', 'for': 'task-title'});
    const addTaskTitle = createElement('input', null, addTaskContainer, {'class': 'task-title', 'id': 'task-title'});
    addTaskTitle.type = 'text';
    addTaskTitle.required = true;

    const addTaskDetailsLabel = createElement('label', 'Details:', addTaskContainer, {'class': 'task-label', 'for': 'task-details'});
    const addTaskDetails = createElement('input', null, addTaskContainer, {'class': 'task-details', 'id': 'task-details'});
    addTaskDetails.type = 'text';
    addTaskDetails.required = false;

    const addTaskDueDateLabel = createElement('label', 'Due Date:', addTaskContainer, {'class': 'task-label', 'for': 'task-date'});
    const addTaskDueDate = createElement('input', null, addTaskContainer, {'class': 'task-date', 'id': 'task-date'});
    addTaskDueDate.type = 'date';
    addTaskDueDate.required = true;

    const addTaskSubmit = createElement('button', 'Submit', addTaskContainer, {'class': 'task-submit', 'id': 'task-submit'});
    addTaskSubmit.type = 'submit';
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayTasks(array) {
    removeAllChildNodes(document.querySelector('.task-container'));
    array.forEach((toDo, index) => {
        const taskContainer = createElement('div', null, document.querySelector('.task-container'), {'class': 'task-card', 'id': `task-${index}`});
        const taskTitle = createElement('h2', `${toDo['task-title']}`, taskContainer, {'class': 'task-title-display'});
        if (toDo['task-details']) {
            const taskDetails = createElement('p', `${toDo['task-details']}`, taskContainer, {'class': 'task-details-display'});
        };
        const taskDate = createElement('p', `${toDo['task-date']}`, taskContainer, {'class': 'task-date-display'});

        const editImage = createImage(Edit, taskContainer, {'class': 'task-button', 'id': `edit-task-${index}`});
        const deleteImage = createImage(Delete, taskContainer, {'class': 'task-button', 'id': `delete-task-${index}`});
    })
}

function testees() {
    console.log('testing')
}


function generateLayout() {
    createHeader();
    createSidebar();
    createMain();
    addTaskForm();
}

export { generateLayout, displayTasks }