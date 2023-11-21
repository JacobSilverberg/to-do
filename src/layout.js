import {createElement, createImage} from './create_element';
import { toDoList, deleteTask, editTask, checkLocalStorage, projectList, applyTaskListeners } from './task_logic';
import Logo from './checkbox-logo.svg';
import Add from './add.svg';
import Edit from "./edit.svg";
import Delete from "./delete.svg";
import Plus from './plus.svg';
import Minus from './proj-minus.svg';
import { parseISO, isToday, startOfToday, differenceInDays } from 'date-fns'


function createHeader() {
    const headerContainer = createElement('div', null, document.querySelector('#content'), {"class": "header-container"});
    const headerLogo = createImage(Logo, headerContainer, {'class': 'header-logo', 'id': 'header-logo'});
    const headerText = createElement('h1', 'To Do', headerContainer, {"id": "header-text"});
}

function createSidebar() {
    const sidebarContainer = createElement('div', null, document.querySelector('#content'), {"class": "sidebar-container"});

    const selectorContainer = createElement('div', null, sidebarContainer, {'class': 'sidebar-title-container'});
    const homeText = createElement('h1', 'Home', selectorContainer, {"class": "sidebar-title", "id": "home"});
    const todayText = createElement('h1', 'Today', selectorContainer, {"class": "sidebar-title", "id": "today"});
    const weekText = createElement('h1', 'Week', selectorContainer, {"class": "sidebar-title", "id": "week"});
    const projectsText = createElement('h1', 'Projects', selectorContainer, {"class": "sidebar-title", "id": "projects"});

    const projectsDiv = createElement('div', null, selectorContainer, {'class': 'project-container'});

    const createdProjectsDiv = createElement('div', null, projectsDiv, {'class': 'created-projects-container'});

    const newProjectDiv = createElement('div', null, projectsDiv, {'class': 'new-project-container'});
    const newProjectImage = createImage(Plus, newProjectDiv, {'class': 'new-project-image'});
    const newProjectText = createElement('p', 'New Project', newProjectDiv, {'class': 'project-text', 'id': 'new-project-text'})

    const addProjectFormContainer = createElement('div', null, projectsDiv, {'class': 'add-project-form-container', 'id': 'add-project-form-container'});
    const addProjectLabel = createElement('label', 'Project Name:', addProjectFormContainer, {'class': 'add-project-label'});
    const addProjectInput = createElement('input', null, addProjectFormContainer, {'id': 'add-project-input'});
    addProjectInput.required = true;
    const addProjectSubmit = createElement('button', 'Add Project', addProjectFormContainer, {'id': 'add-project-submit', 'type': 'submit'});

    const addTaskButtonContainer = createElement('div', null, sidebarContainer, {'id': 'add-button'});
    const addTaskButtonIcon = createImage(Add, addTaskButtonContainer, {'id': 'add-button-icon'});
    const addTaskButtonText = createElement('p', "Add New", addTaskButtonContainer, {'id': 'add-button-text'});
}

function createMain() {
    const mainContainer = createElement('div', null, document.querySelector('#content'), {"class": "main-container"});
    const taskContainer = createElement('div', null, mainContainer, {'class': 'task-container'})
}

function addTaskForm() {
    const addTaskContainer = createElement('div', null, document.querySelector('.main-container'), {'class': 'add-task-container', 'id': 'add-task-container'});

    const addTaskTitleContainer = createElement('div', null, addTaskContainer, {'class': 'add-task-sub-container', 'id': 'add-task-container-title'})
    const addTaskTitleLabel = createElement('label', 'Title*:', addTaskTitleContainer, {'class': 'task-label', 'for': 'task-title'});
    const addTaskTitle = createElement('input', null, addTaskTitleContainer, {'class': 'task-title', 'id': 'task-title'});
    addTaskTitle.type = 'text';
    addTaskTitle.required = true;

    const addTaskDetailsContainer = createElement('div', null, addTaskContainer, {'class': 'add-task-sub-container', 'id': 'add-task-container-details'})
    const addTaskDetailsLabel = createElement('label', 'Details:', addTaskDetailsContainer, {'class': 'task-label', 'for': 'task-details'});
    const addTaskDetails = createElement('input', null, addTaskDetailsContainer, {'class': 'task-details', 'id': 'task-details'});
    addTaskDetails.type = 'text';
    addTaskDetails.required = false;

    const addTaskProjectContainer = createElement('div', null, addTaskContainer, {'class': 'add-task-sub-container', 'id': 'add-task-container-project'})
    const addTaskProjectLabel = createElement('label', 'Project:', addTaskProjectContainer, {'class': 'task-label', 'for': 'task-project-selector'});
    const addTaskProjectSelect = createElement('select', null, addTaskProjectContainer, {'class': 'add-task-project-selector', 'id': 'task-project-selector'});

    const addTaskDueDateContainer = createElement('div', null, addTaskContainer, {'class': 'add-task-sub-container', 'id': 'add-task-container-date'})
    const addTaskDueDateLabel = createElement('label', 'Due Date*:', addTaskDueDateContainer, {'class': 'task-label', 'for': 'task-date'});
    const addTaskDueDate = createElement('input', null, addTaskDueDateContainer, {'class': 'task-date', 'id': 'task-date'});
    addTaskDueDate.type = 'date';
    addTaskDueDate.required = true;

    const addTaskButtonContainer = createElement('div', null, addTaskContainer, {'class': 'add-task-sub-container', 'id': 'add-task-container-buttons'})
    const addTaskSubmit = createElement('button', 'Submit', addTaskButtonContainer, {'class': 'task-submit', 'id': 'task-submit'});
    addTaskSubmit.type = 'submit';

    const addTaskClose = createElement('button', 'Close', addTaskButtonContainer, {'class': 'task-close', 'id': 'add-task-close'});
}

function editTaskForm() {
    const editTaskContainer = createElement('div', null, document.querySelector('.main-container'), {'class': 'edit-task-container', 'id': 'edit-task-container'});

    const editTaskTitleContainer = createElement('div', null, editTaskContainer, {'class': 'edit-task-sub-container', 'id': 'edit-task-container-title'})
    const editTaskTitleLabel = createElement('label', 'Title*:', editTaskTitleContainer, {'class': 'task-label', 'for': 'edit-task-title'});
    const editTaskTitle = createElement('input', null, editTaskTitleContainer, {'class': 'task-title', 'id': 'edit-task-title'});
    editTaskTitle.type = 'text';
    editTaskTitle.required = true;

    const addTaskDetailsContainer = createElement('div', null, editTaskContainer, {'class': 'edit-task-sub-container', 'id': 'edit-task-container-details'})
    const editTaskDetailsLabel = createElement('label', 'Details:', addTaskDetailsContainer, {'class': 'task-label', 'for': 'edit-task-details'});
    const editTaskDetails = createElement('input', null, addTaskDetailsContainer, {'class': 'task-details', 'id': 'edit-task-details'});
    editTaskDetails.type = 'text';
    editTaskDetails.required = false;

    const editTaskProjectContainer = createElement('div', null, editTaskContainer, {'class': 'edit-task-sub-container', 'id': 'edit-task-container-project'})
    const editTaskProjectLabel = createElement('label', 'Project:', editTaskProjectContainer, {'class': 'task-label', 'for': 'edit-task-project-selector'});
    const editTaskProjectSelect = createElement('select', null, editTaskProjectContainer, {'class': 'edit-task-project-selector', 'id': 'edit-task-project-selector'});

    const editTaskDueDateContainer = createElement('div', null, editTaskContainer, {'class': 'edit-task-sub-container', 'id': 'edit-task-container-date'})
    const editTaskDueDateLabel = createElement('label', 'Due Date*:', editTaskDueDateContainer, {'class': 'task-label', 'for': 'edit-task-date'});
    const editTaskDueDate = createElement('input', null, editTaskDueDateContainer, {'class': 'task-date', 'id': 'edit-task-date'});
    editTaskDueDate.type = 'date';
    editTaskDueDate.required = true;

    const addTaskButtonContainer = createElement('div', null, editTaskContainer, {'class': 'edit-task-sub-container', 'id': 'edit-task-container-buttons'})
    const editTaskSubmit = createElement('button', 'Submit', addTaskButtonContainer, {'class': 'task-submit', 'id': 'edit-task-submit'});
    editTaskSubmit.type = 'submit';

    const addTaskClose = createElement('button', 'Close', addTaskButtonContainer, {'class': 'task-close', 'id': 'edit-task-close'});
}

function populateProjectDropdown() {
    removeAllChildNodes(document.getElementById('task-project-selector'));
    removeAllChildNodes(document.getElementById('edit-task-project-selector'));
    const projectNone = createElement('option', 'None', document.getElementById('task-project-selector'), {'value': 'None','class': 'project-option', 'id':`project-option-none`});
    const projectEditNone = createElement('option', 'None', document.getElementById('edit-task-project-selector'), {'value': 'None','class': 'project-option', 'id':`project-option-none`});
    for (let i = 0; i < projectList.length; i++) {
        console.log(projectList[i]);
        const project = createElement('option', projectList[i], document.getElementById('task-project-selector'), {'value': `${projectList[i]}`,'class': 'project-option', 'id':`project-option-${i}`});
        const projectEdit = createElement('option', projectList[i], document.getElementById('edit-task-project-selector'), {'value': `${projectList[i]}`,'class': 'project-option', 'id':`project-option-${i}`});
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayTasks() {
    removeAllChildNodes(document.querySelector('.task-container'));
    toDoList.forEach((toDo, index) => {
        const taskContainer = createElement('div', null, document.querySelector('.task-container'), {'class': 'task-card', 'id': `task-${index}`});
        const taskTitle = createElement('h2', `${toDo['task-title']}`, taskContainer, {'class': 'task-title-display'});
        if (toDo['task-details']) {
            const taskDetails = createElement('p', `${toDo['task-details']}`, taskContainer, {'class': 'task-details-display'});
        };
        const dateAndIconContainer = createElement('div', null, taskContainer, {'class': 'date-icon-container'});

        const taskDate = createElement('p', `${toDo['task-date']}`, dateAndIconContainer, {'class': 'task-date-display'});
        const taskProject = createElement('p', `${toDo['task-project']}`, dateAndIconContainer, {'class': 'project-display'})
        const iconContainer = createElement('div', null, dateAndIconContainer, {'class': 'icon-container'});
        const editImage = createImage(Edit, iconContainer, {'class': 'task-button', 'id': `editing-task-${index}`});
        const deleteImage = createImage(Delete, iconContainer, {'class': 'task-button', 'id': `delete-task-${index}`});
    })
}

function displayTasksToday() {
    removeAllChildNodes(document.querySelector('.task-container'));
    toDoList.forEach((toDo, index) => {
        var today = isToday(parseISO(toDo['task-date']));
        if (today == true) {
            const taskContainer = createElement('div', null, document.querySelector('.task-container'), {'class': 'task-card', 'id': `task-${index}`});
            const taskTitle = createElement('h2', `${toDo['task-title']}`, taskContainer, {'class': 'task-title-display'});
            if (toDo['task-details']) {
                const taskDetails = createElement('p', `${toDo['task-details']}`, taskContainer, {'class': 'task-details-display'});
            };
            const dateAndIconContainer = createElement('div', null, taskContainer, {'class': 'date-icon-container'});

            const taskDate = createElement('p', `${toDo['task-date']}`, dateAndIconContainer, {'class': 'task-date-display'});

            const iconContainer = createElement('div', null, dateAndIconContainer, {'class': 'icon-container'});
            const editImage = createImage(Edit, iconContainer, {'class': 'task-button', 'id': `editing-task-${index}`});
            const deleteImage = createImage(Delete, iconContainer, {'class': 'task-button', 'id': `delete-task-${index}`});
        }
    })
}

function displayTasksWeek() {
    removeAllChildNodes(document.querySelector('.task-container'));
    toDoList.forEach((toDo, index) => {
        var today = startOfToday();
        var taskDue = parseISO(toDo['task-date']);
        if (differenceInDays(today, taskDue) >= -7) {
            const taskContainer = createElement('div', null, document.querySelector('.task-container'), {'class': 'task-card', 'id': `task-${index}`});
            const taskTitle = createElement('h2', `${toDo['task-title']}`, taskContainer, {'class': 'task-title-display'});
            if (toDo['task-details']) {
                const taskDetails = createElement('p', `${toDo['task-details']}`, taskContainer, {'class': 'task-details-display'});
            };
            const dateAndIconContainer = createElement('div', null, taskContainer, {'class': 'date-icon-container'});

            const taskDate = createElement('p', `${toDo['task-date']}`, dateAndIconContainer, {'class': 'task-date-display'});

            const iconContainer = createElement('div', null, dateAndIconContainer, {'class': 'icon-container'});
            const editImage = createImage(Edit, iconContainer, {'class': 'task-button', 'id': `editing-task-${index}`});
            const deleteImage = createImage(Delete, iconContainer, {'class': 'task-button', 'id': `delete-task-${index}`});
        }
    })
}

function displayProjectsSidebar() {
    removeAllChildNodes(document.querySelector('.created-projects-container'));
    for (let i = 0; i < projectList.length; i++) {
        const projectContainer = createElement('div', null, document.querySelector('.created-projects-container'), {'class': 'project-title-container'})
        const project = createElement('p', `${projectList[i]}`, projectContainer, {'class': 'project-title', 'id': `project-title-${i}`});
        const deleteProject = createImage(Minus, projectContainer, {'class': 'delete-project-icon', 'id':`delete-project-${i}`});
    }
}

function displaySelectedProject() {
    console.log(this);
    return;
}


function generateLayout() {
    createHeader();
    createSidebar();
    createMain();
    addTaskForm();
    editTaskForm();
    checkLocalStorage();
    displayProjectsSidebar();
    applyTaskListeners();
    populateProjectDropdown();
}

export { generateLayout, displayTasks, displayTasksToday, displayTasksWeek, displayProjectsSidebar, displaySelectedProject, populateProjectDropdown }