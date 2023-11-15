import './style.css';
import generateLayout from './layout';
import addTask from './task_logic';

generateLayout();

document.querySelector('#add-button').addEventListener('click', addTask);