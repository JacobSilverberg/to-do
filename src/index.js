import './style.css';
import { generateLayout } from './layout';
import { addTask, editTaskSubmit, displayAddTaskForm } from './task_logic';

generateLayout();

document.querySelector('#add-button').addEventListener('click', displayAddTaskForm);
document.querySelector('#task-submit').addEventListener('click', addTask);
document.querySelector('#edit-task-submit').addEventListener('click', editTaskSubmit);