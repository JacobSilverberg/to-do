import './style.css';

function component() {
    const element = document.createElement('div');
    const textHere = document.createElement('p');
    textHere.textContent = "Once again.";

    element.appendChild(textHere);
    element.setAttribute('class', 'hello');

  
    return element;
}
  
    const content = document.querySelector('#content');
    content.appendChild(component());  


    console.log("How we doing?");