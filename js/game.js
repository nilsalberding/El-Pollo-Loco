import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { AudioHub, MyAudio } from "./audiohub.class.js";

let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by selecting the canvas element
 * and creating a new instance of the game world.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
};

/**
 * Toggles visibility of a screen element by its ID.
 * - Switches between `d-none` and `d-flex` classes.
 *
 * @param {string} screenID - The ID of the screen element to toggle.
 */
export function toggleScreen(screenID) {
    const screen = document.getElementById(screenID);
    screen.classList.toggle('d-none');
    screen.classList.toggle('d-flex');
}

/**
 * Toggles between the start screen and another screen.
 *
 * @param {string} screenID - The ID of the target screen.
 */
function toggleWithStartScreen(screenID) {
    toggleScreen('start-screen');
    toggleScreen(screenID);
}

/**
 * Starts the game:
 * - Plays the start sound.
 * - Toggles the loading screen.
 * - Initializes the game world.
 * - After 3 seconds, switches to the mobile controls screen and starts background music.
 */
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

/**
 *  * Starts the game:
 * - Plays the start sound.
 * - Toggles the loading screen.
 * - Initializes the game world.
 * - After 3 seconds, switches to the mobile controls screen and starts background music.
 * @param {string} endscreen - loser- or winner-screen
 */
function restartGame(endscreen) {
    AudioHub.playOne(AudioHub.GAME_START);
    init();
    toggleScreen(endscreen);
    toggleScreen('loading-screen');
    setTimeout(() => {
        toggleScreen('loading-screen');
        toggleScreen('mobile-btns');
        AudioHub.playOne(AudioHub.GAME_MUSIC);
    }, 1000 * 3);
}

/**
 * Sets event listeners for all UI buttons, including:
 * - Start button
 * - Controls screen (open/close)
 * - Legal notice screen (open/close)
 * - Restart from loser screen
 * - Restart from winner screen
 */
function setBtns() {
    document.getElementById('start-button').addEventListener('click', startGame);

    // Controls screen
    document.getElementById('btn-controls').addEventListener('click', () => {
        toggleWithStartScreen('controls-screen');
    });
    document.getElementById('btn-controls-back').addEventListener('click', () => {
        toggleWithStartScreen('controls-screen');
    });

    // Legal notice screen
    document.getElementById('btn-legal-notice').addEventListener('click', () => {
        toggleWithStartScreen('legal-notice-screen')
    });
    document.getElementById('btn-legal-notice-back').addEventListener('click', () => {
        toggleWithStartScreen('legal-notice-screen')
    });

    // Loser screen
    document.getElementById('btn-menu-lose').addEventListener('click', () => {
        toggleWithStartScreen('loser-screen')
    });
    document.getElementById('btn-restart-lose').addEventListener('click', () => {
        restartGame('loser-screen')
    });


    // Winner screen
    document.getElementById('btn-menu-win').addEventListener('click', () => {
        toggleWithStartScreen('winner-screen')
    });
    document.getElementById('btn-restart-win').addEventListener('click', () => {
        restartGame('winner-screen')
    });
}

/**
 * Initializes sound settings by attaching event listeners
 * to sound on/off buttons.
 */
function setSoundBtn() {
    MyAudio.loadFromLocalStorage();
    if (!MyAudio.soundOn) {
        toggleScreen('btn-sound-mute');
        toggleScreen('btn-sound-on');
        AudioHub.allSounds.forEach((sound) => {
            sound.sound.volume = 0.0;
        })
    }
    soundOn();
    soundOff();
}

/**
 * Enables game sounds:
 * - Toggles sound buttons visibility.
 * - Sets volume of all sounds to 0.2.
 */
function soundOn() {
    document.getElementById('btn-sound-on').addEventListener('click', () => {
        toggleScreen('btn-sound-mute');
        toggleScreen('btn-sound-on');
        AudioHub.allSounds.forEach((sound) => {
            sound.sound.volume = 0.2;
        })
        MyAudio.soundOn = true;
        MyAudio.saveToLocalStorage();
    })
}

/**
 * Disables game sounds:
 * - Toggles sound buttons visibility.
 * - Sets volume of all sounds to 0.0 (mute).
 */
function soundOff() {
    document.getElementById('btn-sound-mute').addEventListener('click', () => {
        toggleScreen('btn-sound-mute');
        toggleScreen('btn-sound-on');
        AudioHub.allSounds.forEach((sound) => {
            sound.sound.volume = 0.0;
        })
        MyAudio.soundOn = false;
        MyAudio.saveToLocalStorage();
    })
}

// Initialize UI buttons and sound controls
setBtns();
setSoundBtn();


// TODO : Fullscreen einstellen

