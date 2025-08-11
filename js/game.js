
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
}) 