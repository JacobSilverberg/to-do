function createElement(elementType, text, parent, attributes) {
    const element = document.createElement(elementType);
    if (text) {
        element.textContent = text;
    }
    if (attributes) {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }
    parent.appendChild(element);
    return element;
}

function createImage(image, parent, attributes) {
    const newImage = new Image();
    newImage.src = image;
    if (attributes) {
        for (const key in attributes) {
            newImage.setAttribute(key, attributes[key]);
        }
    }
    parent.appendChild(newImage);
}

export { createElement, createImage }