import {createElement, createImage} from "./create_element";
import Edit from "./edit.svg";
import Delete from "./delete.svg";


function addTask() {
    const taskNum = document.querySelectorAll(".task-container");
    console.log(taskNum);

    const taskContainer = createElement('div', null, document.querySelector('.main-container'), {"class": "task-container", "id": "new-task"});
    const taskText = createElement('p', 'text here', taskContainer, {"class": "task-text", "id": "task-text-$"});
    const editButton = createImage(Edit, taskContainer, {"class": "edit-button", "id": "edit-$"});
    const deleteButton = createImage(Delete, taskContainer, {"class": "delete-button", "id": "delete-$"});
}

export default addTask;