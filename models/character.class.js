import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable_object.class.js";


export class Character extends MovableObject {

    world;


    constructor() {
        super().loadImage(Pix.mainChar.walk[0]);
        this.loadImages(Pix.mainChar.walk);
        this.loadImages(Pix.mainChar.jump);
        this.x = 80;
        this.y = 0;
        this.height = 200;
        this.width = this.height * 0.5083;
        this.speedX = 7;
        IntervalHub.startInterval(this.moveRight, 1000 / 60);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
        IntervalHub.startInterval(this.animate, 1000 / 15);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.jump, 1000 / 25);

    }

    // #region methods

    

    animate = () => {
        if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(Pix.mainChar.walk);
        }

        if(this.isAboveGround()) {
            this.playAnimation(Pix.mainChar.jump)
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

    jump = () => {
        if(Keyboard.SPACE && !this.isAboveGround()){
            this.speedY = 20

        }


    }
}