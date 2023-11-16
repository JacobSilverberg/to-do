import './style.css';
import { generateLayout } from './layout';
import { addTask, displayAddTaskForm } from './task_logic';

generateLayout();

document.querySelector('#add-button').addEventListener('click', displayAddTaskForm);
document.querySelector('#task-submit').addEventListener('click', addTask);