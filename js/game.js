
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

export let canvas;
export let world;
export let keyboard = new Keyboard();


export function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

init();

window.world = world;

// window.addEventListener("keydown", (e) => {
//     console.log(e)
// })

window.addEventListener("keydown", (e) => {
    if (e.key == ' ') {
        keyboard.SPACE = true;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (e.key == 'ArrowUp') {
        keyboard.UP = true;
    }
})

window.addEventListener("keyup", (e) => {
    if (e.key == ' ') {
        keyboard.SPACE = false;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (e.key == 'ArrowUp') {
        keyboard.UP = false;
    }
}) 