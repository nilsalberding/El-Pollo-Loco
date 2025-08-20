
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { AudioHub } from "./audiohub.class.js";
import { IntervalHub } from "./intervall_hub.class.js";

let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
};

function restart() {
    IntervalHub.stopAllIntervals();
    init();
}

function startGame() {
    const startScreen = document.getElementById('start-screen');
    startScreen.classList.toggle('d-none');
    startScreen.classList.toggle('d-flex');
    init();
}

function showControls() {
    const startScreen = document.getElementById('start-screen');
    const controlsScreen = document.getElementById('controls-screen');

    startScreen.classList.toggle('d-none');
    startScreen.classList.toggle('d-flex');
    controlsScreen.classList.toggle('d-none');
    controlsScreen.classList.toggle('d-flex');
}

function showLegalNotice() {
    const startScreen = document.getElementById('start-screen');
    const legalNoticeScreen = document.getElementById('legal-notice-screen');

    startScreen.classList.toggle('d-none');
    startScreen.classList.toggle('d-flex');
    legalNoticeScreen.classList.toggle('d-none');
    legalNoticeScreen.classList.toggle('d-flex');
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('btn-controls').addEventListener('click', showControls);
document.getElementById('btn-controls-back').addEventListener('click', showControls);
document.getElementById('btn-legal-notice').addEventListener('click', showLegalNotice);
document.getElementById('btn-legal-notice-back').addEventListener('click', showLegalNotice);

// init();



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

// TODO : animation nur einmal durchlaufen lassen bei bestimmten funktionen

 
// TODO : Spiel responsive machen
// TODO : Game-Over Screen
// TODO : Endgegner besiegen
