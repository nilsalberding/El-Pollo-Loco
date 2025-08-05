
import { World } from "../models/world.class.js";

let canvas;
let ctx;

let world = new World();


export function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    console.log(world.character);    
};

init();