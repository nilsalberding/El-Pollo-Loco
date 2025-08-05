
import { World } from "../models/world.class.js";

let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    

    console.log(world.character);    
    console.log(world.enemies);
};

init();

console.log(world);


window.init = init;
window.world = world;