
let display = document.getElementsByClassName('display')[0];
let smallcontainer = document.getElementsByClassName('small-container')[0];
let button = smallcontainer.getElementsByClassName('btn');

for (let i = 0; i < button.length; i++) {
    let theClickedItem = button[i].addEventListener('click', displayFn)
} 

function displayFn(e) {
    if (e.target.innerText == "AC") {
        display.innerText = "";

    } else if (e.target.innerText == "DEL") {
        display.innerText = display.innerText.slice(0, -1);

    } else if (e.target.innerText == "=") {

        try {
            if (display.innerText.indexOf("%") != -1) {
                display.innerText = display.innerText.slice(0, -1) / 100;
            } else{
                display.innerText = eval(display.innerText);

            }

        } catch {
            display.innerText = "Not Valid!";
        }
        display.innerText = eval(display.innerText);

    } else {
        display.innerText += e.target.innerText
    }
}
