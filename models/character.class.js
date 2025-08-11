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
        this.loadImages(Pix.mainChar.dead)
        this.x = 80;
        this.y = 220;
        this.height = 200;
        this.width = this.height * 0.5083;
        this.speedX = 7;
        this.health = 100;

        IntervalHub.startInterval(this.moveSet, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.animations, 1000 / 15)

    }

    // #region methods
    moveRightChar() {
        this.x += this.speedX;
        this.otherDirection = false;
    }

    moveLeftChar() {
        this.x -= this.speedX;
        this.otherDirection = true;
    }

    jump() {
        this.speedY = 20
    }


    moveSet = () => {
        if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRightChar();
        }
        if (Keyboard.LEFT && this.x > 0) {
            this.moveLeftChar();
        }
        if (Keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }

    animations = () => {
        if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(Pix.mainChar.walk);
        }else if (this.isAboveGround()) {
            this.playAnimation(Pix.mainChar.jump);
        }else if(this.isDead()) {
            this.playAnimation(Pix.mainChar.dead);
        }
    }




}