import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable_object.class.js";


export class Character extends MovableObject {

    world;


    constructor() {
        super().loadImage(Pix.mainChar.walk[0]);
        this.loadImages(Pix.mainChar.walk)
        this.x = 80;
        this.y = 220;
        this.height = 200;
        this.width = this.height * 0.5083;
        this.speedX = 7;
        IntervalHub.startInterval(this.moveRight, 1000 / 60);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
        IntervalHub.startInterval(this.animate, 1000 / 15);

    }

    // #region methods
    animate = () => {
        if (Keyboard.RIGHT || Keyboard.LEFT) {
 
            let i = this.currentImage % Pix.mainChar.walk.length;
            let path = Pix.mainChar.walk[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    moveRight = () => {
        if(Keyboard.RIGHT && this.x <  this.world.level.level_end_x){
            this.x += this.speedX;
            this.otherDirection = false;
            
        }  
        this.world.camera_x = -this.x +100;      
    }

    moveLeft = () => {
        if(Keyboard.LEFT && this.x > 0){
            this.x -= this.speedX;
            this.otherDirection = true;
            
        }
        this.world.camera_x = -this.x +100;
    }


    jump() {

    }
}