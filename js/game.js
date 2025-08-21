
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
    AudioHub.playOne(AudioHub.GAME_START);

    toggleStartScreen();
    toggleMobileBtns();
    init();
}

 function switchScreen(screenID) {
    const endScreen = document.getElementById(screenID);

    endScreen.classList.toggle('d-none');
    endScreen.classList.toggle('d-flex');    
    toggleStartScreen();
 }

 function toggleStartScreen() {
    const startScreen = document.getElementById('start-screen');
    startScreen.classList.toggle('d-none');
    startScreen.classList.toggle('d-flex');
 }

export function toggleMobileBtns() {
    const btns = document.getElementById('mobile-btns');
    btns.classList.toggle('d-none');
    btns.classList.toggle('d-flex');

 }


document.getElementById('start-button').addEventListener('click', startGame);

// btns-controls
document.getElementById('btn-controls').addEventListener('click', () => {
    switchScreen('controls-screen');
});

document.getElementById('btn-controls-back').addEventListener('click', () => {
    switchScreen('controls-screen');
});

// btn-legal-notice-screen
document.getElementById('btn-legal-notice').addEventListener('click', () => {
switchScreen('legal-notice-screen')
});
document.getElementById('btn-legal-notice-back').addEventListener('click', () => {
switchScreen('legal-notice-screen')
});


// btn-loser screen
document.getElementById('btn-restart-lose').addEventListener('click', () => {
switchScreen('loser-screen')
});

// btn-winner-screen
document.getElementById('btn-restart-win').addEventListener('click', () => {
switchScreen('winner-screen')
});


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


// TODO : Fullscreen einstellen
// TODO : Steuerung anzeigen + Mobile-Steuerung einrichten

// TODO : animation nur einmal durchlaufen lassen bei bestimmten funktionen

 
// TODO : Spiel responsive machen
