import { AudioHub } from "../js/audiohub.class.js";
import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Bottle } from "./bottle.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable_object.class.js";
import { ThrowableObject } from "./throwable_object.class.js";


export class Character extends MovableObject {

    // #region attributes
    world;
    bottleReady = true;
    isFalling = false;
    x = 80;
    y = 220;
    height = 200;
    speedX = 7;
    health = 100;
    offset = {
        top: 100,
        right: 30,
        left: 20,
        bottom: 10
    }
    isJumping = false;
    firstContactBoss = false;
    static LOOKLEFT = false;
    // #endregion

    constructor() {
        super().loadImage(Pix.mainChar.walk[0]);
        this.width = this.height * 0.5083;
        this.loadCharImages();
        this.startIntervals();
    }

    // #region methods

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
        if (Keyboard.D) {
            this.throwBottle();
        }
        this.world.camera_x = -this.x + 100;
    }

    animations = () => {
        if (this.isAboveGround() && this.isJumping) {
            this.playJumpAnimation(Pix.mainChar.jump);
        } else if (this.isAboveGround()) {
            this.img = this.imageCache[Pix.mainChar.jump[6]];
        } else if (this.isDead()) {
            this.playAnimation(Pix.mainChar.dead);
        } else if (this.isHurt) {
            this.playAnimation(Pix.mainChar.hurt);
        } else if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(Pix.mainChar.walk);
        } else {
            this.playAnimation(Pix.mainChar.idle);
        }
    }

    setSound = () => {
        if ((Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround()) {
            AudioHub.playOne(AudioHub.CHR_RUN);
        } else if (!Keyboard.RIGHT || !Keyboard.LEFT) {
            AudioHub.stopOne(AudioHub.CHR_RUN);
        }
    }


    moveRightChar() {
        this.x += this.speedX;
        this.otherDirection = false;
        Character.LOOKLEFT = false;
    }

    moveLeftChar() {
        this.x -= this.speedX;
        this.otherDirection = true;
        Character.LOOKLEFT = true;
    }

    jump() {
        this.speedY = 17;
        this.isJumping = true;
        this.currentImage = 0;
        AudioHub.playOne(AudioHub.CHR_JUMP);
    }

    miniJump() {
        this.speedY = 10;
        this.isJumping = true;
        this.currentImage = 0;
        AudioHub.playOne(AudioHub.CHR_JUMP);
    }

    checkFalling = () => {

        if (!this.isAboveGround()) {
            this.isFalling = false;
        } else if (this.speedY < 0) {
            this.isFalling = true;
        }
    }

    throwBottle() {
        if (this.bottleReady && Bottle.bottlePercentage > 0) {
            const bottle = new ThrowableObject(this.x, this.y);
            this.world.throwableObject.push(bottle);
            Bottle.bottlePercentage -= 20;
            this.world.bottlebar.setPercentage(Bottle.bottlePercentage, Pix.status.bottle);
            this.bottleReady = false;
            setTimeout(() => {
                this.bottleReady = true;
            }, 1000);
        }
    }

    playJumpAnimation(pixArray) {
        if (this.isJumping) {
            let i = this.currentImage % pixArray.length;
            let path = pixArray[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (i == pixArray.length - 1) {
                this.isJumping = false;
            }
        }
    }

    startIntervals() {
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.moveSet, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 60);
        IntervalHub.startInterval(this.animations, 1000 / 15);
        IntervalHub.startInterval(this.checkFalling, 1000 / 30);
        IntervalHub.startInterval(this.setSound, 1000 / 4);
    }

    loadCharImages() {
        this.loadImages(Pix.mainChar.walk);
        this.loadImages(Pix.mainChar.jump);
        this.loadImages(Pix.mainChar.dead);
        this.loadImages(Pix.mainChar.hurt);
        this.loadImages(Pix.mainChar.idle);
    }
    // #endregion
}