
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
};

init();



// window.addEventListener("keydown", (e) => {
//     console.log(e)
// })

window.addEventListener("keydown", (e) => {
    if (e.key == ' ') {
        Keyboard.SPACE = true;
    }
    if (e.key == 'ArrowLeft') {
        Keyboard.LEFT = true;
    }
    if (e.key == 'ArrowRight') {
        Keyboard.RIGHT = true;
    }
    if (e.key == 'ArrowDown') {
        Keyboard.DOWN = true;
    }
    if (e.key == 'ArrowUp') {
        Keyboard.UP = true;
    }
    if (e.key == 'd') {
        Keyboard.D = true;
    }
})

window.addEventListener("keyup", (e) => {
    if (e.key == ' ') {
        Keyboard.SPACE = false;
    }
    if (e.key == 'ArrowLeft') {
        Keyboard.LEFT = false;
    }
    if (e.key == 'ArrowRight') {
        Keyboard.RIGHT = false;
    }
    if (e.key == 'ArrowDown') {
        Keyboard.DOWN = false;
    }
    if (e.key == 'ArrowUp') {
        Keyboard.UP = false;
    }
    if (e.key == 'd') {
        Keyboard.D = false;
    }
}) 

// TODO : Startbildschirm erzeugen
// TODO : Fullscreen einstellen
// TODO : Steuerung anzeigen + Mobile-Steuerung einrichten
// TODO : miniChicken Klasse erstellen und einfügen

// TODO : level strukturieren und Gegner korrekt einfügen
// TODO : Spiel responsive machen
// TODO : Game-Over Screen
// TODO : Endgegner besiegen
