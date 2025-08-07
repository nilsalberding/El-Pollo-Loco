import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable_object.class.js";


export class Character extends MovableObject{

    world;
    

    constructor(){
        super().loadImage(Pix.mainChar.walk[0]);
        this.loadImages(Pix.mainChar.walk)
        this.x = 80;
        this.y = 220;
        this.height = 200;
        this.width = this.height * 0.5083;
        IntervalHub.startInterval(this.animate, 1000 / 12);     
        
    }

    // #region methods
    animate = () => {
        if(Keyboard.RIGHT){
        let i = this.currentImage % Pix.mainChar.walk.length;
        let path = Pix.mainChar.walk[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }}


    jump(){

    }
}