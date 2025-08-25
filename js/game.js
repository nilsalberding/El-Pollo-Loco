
import { Chicken } from "../models/chicken.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { AudioHub } from "./audiohub.class.js";
import { IntervalHub } from "./intervall_hub.class.js";

let canvas;
let world;
let keyboard = new Keyboard();

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

function setSound() {
    soundOn();
    soundOff();
}

function soundOn() {
    document.getElementById('btn-sound-on').addEventListener('click', () => {
        toggleScreen('btn-sound-mute');
        toggleScreen('btn-sound-on');
        AudioHub.allSounds.forEach((sound) => {
            sound.sound.volume = 0.2;
        })
    })
}
function soundOff() {
    document.getElementById('btn-sound-mute').addEventListener('click', () => {
        toggleScreen('btn-sound-mute');
        toggleScreen('btn-sound-on');
        AudioHub.allSounds.forEach((sound) => {
            sound.sound.volume = 0.0;
        })
    })
}

setBtns();
setSound();


// TODO : Fullscreen einstellen

