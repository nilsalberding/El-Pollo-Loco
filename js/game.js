
import { Chicken } from "../models/chicken.class.js";
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

export function toggleScreen(screenID) {
    const screen = document.getElementById(screenID);
    screen.classList.toggle('d-none');
    screen.classList.toggle('d-flex');
}

function toggleWithStartScreen(screenID) {
    toggleScreen('start-screen');
    toggleScreen(screenID);
}

function startGame() {
    AudioHub.playOne(AudioHub.GAME_START);
    toggleWithStartScreen('loading-screen');
    init();
    setTimeout(() => {
        toggleScreen('loading-screen');
        toggleScreen('mobile-btns');
        AudioHub.playOne(AudioHub.GAME_MUSIC);
    }, 1000 * 3);
}

function setBtns() {
    document.getElementById('start-button').addEventListener('click', startGame);

    // btns-controls
    document.getElementById('btn-controls').addEventListener('click', () => {
        toggleWithStartScreen('controls-screen');
    });

    document.getElementById('btn-controls-back').addEventListener('click', () => {
        toggleWithStartScreen('controls-screen');
    });

    // btn-legal-notice-screen
    document.getElementById('btn-legal-notice').addEventListener('click', () => {
        toggleWithStartScreen('legal-notice-screen')
    });
    document.getElementById('btn-legal-notice-back').addEventListener('click', () => {
        toggleWithStartScreen('legal-notice-screen')
    });
    // btn-loser screen
    document.getElementById('btn-restart-lose').addEventListener('click', () => {
        toggleWithStartScreen('loser-screen')
    });

    // btn-winner-screen
    document.getElementById('btn-restart-win').addEventListener('click', () => {
        toggleWithStartScreen('winner-screen')
    });
}

setBtns();





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

