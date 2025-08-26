import { AudioHub } from "../js/audiohub.class.js";
import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Bottle } from "./bottle.class.js";
import { Keyboard } from "./keyboard.class.js";
import { MovableObject } from "./movable_object.class.js";
import { ThrowableObject } from "./throwable_object.class.js";

/**
 * Creates the main-character of the game
 * @class
 */
export class Character extends MovableObject {
    // #region attributes
    /**
     * reference of the instance of class World
     */
    world;
    /**
     * Flag, which shows if the bottle can be throw by Character
     * @type {boolean} 
     */
    bottleReady = true;
    /**
     * Flag, which shows if character is falling
     * @type {boolean} 
     */
    isFalling = false;
    lastMove = new Date().getTime();
    x = 80;
    y = 220;
    height = 200;

    speedX = 7;
    health = 100;

    /**
    * Collision offset values to adjust hitbox.
    * @type {{top:number,left:number,right:number,bottom:number}}
    */
    offset = {
        top: 100,
        right: 30,
        left: 20,
        bottom: 10
    }
    /**
     * Flag, which shows if character is falling
     * @type {boolean}
     */
    isJumping = false;
    /**
     * Flag, if character is snoring
     * @type {boolean}
     */
    isSnoring = false;
    /**
     * Flag, which shows if Character had Contact with Boss
     * @type {boolean}
     */
    firstContactBoss = false;
    /**
     * Flag, which shows if character looks left or right
     * @type {boolean}
     * @static
     */
    static LOOKLEFT = false;
    // #endregion

    /**
     * constructor load images, start the intervals and set width of the character image
     */
    constructor() {
        super().loadImage(Pix.mainChar.walk[0]);
        this.width = this.height * 0.5083;
        this.loadCharImages();
        this.startIntervals();
    }

    // #region methods

    /**
     * Set the moveset of the character
     * @method
     */
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

    /**
     * Set the animations of the character
     * @method
     */
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
        } else if (this.isSleeping()) {
            this.playAnimation(Pix.mainChar.longIdle);
        } else {
            this.playAnimation(Pix.mainChar.idle);
        }
    }

    /**
     * set sounds of the character if he´s running
     * @method
     */
    setSound = () => {
        if (this.isSleeping()){
            this.snoring();
        }else if ((Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround()) {
            AudioHub.playOne(AudioHub.CHR_RUN);
        } else if (!Keyboard.RIGHT || !Keyboard.LEFT) {
            AudioHub.stopOne(AudioHub.CHR_RUN);
        }}

    /**
     * Let the character move right
     * @method
     */
    moveRightChar() {
        this.x += this.speedX;
        this.otherDirection = false;
        Character.LOOKLEFT = false;
        this.lastMove = new Date().getTime();
    }

    /**
     * Let the character move left
     * @method
     */
    moveLeftChar() {
        this.x -= this.speedX;
        this.otherDirection = true;
        Character.LOOKLEFT = true;
        this.lastMove = new Date().getTime();
    }

    /**
     * let the character jump
     * @method
     */
    jump() {
        this.speedY = 17;
        this.isJumping = true;
        this.currentImage = 0;
        this.lastMove = new Date().getTime();
        AudioHub.playOne(AudioHub.CHR_JUMP);
    }

    /**
     * minijump, if the character is jumping on an enemy
     * @method
     */
    miniJump() {
        this.speedY = 10;
        this.isJumping = true;
        this.currentImage = 0;
    }

    /**
     * checks, if the Character is falling down
     * @method
     */
    checkFalling = () => {
        if (!this.isAboveGround()) {
            this.isFalling = false;
        } else if (this.speedY < 0) {
            this.isFalling = true;
        }
    }

    snoring() {
        if (!this.isSnoring) {
            this.isSnoring = true;
            AudioHub.playOne(AudioHub.CHR_SNORING);
            setTimeout(() => {
                this.isSnoring = false;
            },1000 * 3)
        }
        
    }


    /**
     * let the character throw a bottle
     * @method
     */
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

    /**
     * Set the jump-animation of the character
     * @method
     * @param {string} pixArray - Array with Images of the Animation
     */
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

    isWalking() {
        return Keyboard.LEFT || Keyboard.RIGHT;
    }

    isSleeping() {
        let timePassed = new Date().getTime() - this.lastMove;
        timePassed = timePassed / 1000;
        return timePassed > 5;
    }

    /**
     * start the interval-methods of the character
     * @method
     */
    startIntervals() {
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.moveSet, 1000 / 60);
        IntervalHub.startInterval(this.applyGravity, 1000 / 60);
        IntervalHub.startInterval(this.animations, 1000 / 15);
        IntervalHub.startInterval(this.checkFalling, 1000 / 30);
        IntervalHub.startInterval(this.setSound, 1000 / 4);
    }

    /**
     * load the images of the character
     * @method
     */
    loadCharImages() {
        this.loadImages(Pix.mainChar.walk);
        this.loadImages(Pix.mainChar.jump);
        this.loadImages(Pix.mainChar.dead);
        this.loadImages(Pix.mainChar.hurt);
        this.loadImages(Pix.mainChar.idle);
        this.loadImages(Pix.mainChar.longIdle);
    }
    // #endregion
}