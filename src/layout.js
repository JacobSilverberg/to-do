import {createElement, createImage} from './create_element';
import Add from './add.svg';

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
    const mainText = createElement('h1', 'Main Text Here', mainContainer);
}

function generateLayout() {
    createHeader();
    createSidebar();
    createMain();
}

export default generateLayout;