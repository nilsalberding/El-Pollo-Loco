import { IntervalHub } from "../js/intervall_hub.class.js";
import { DrawableObject } from "./drawable_object.class.js";
// import { Character } from "./character.class.js";
// import { Chicken } from "./chicken.class.js";


export class MovableObject extends DrawableObject {

    // #region attributes
    speedX;
    speedY = 0;
    acceleration = 1;

    otherDirection = false;
    health;
    // lastHit;
    isHurt;

    // #endregion

    // #region methods

    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    isAboveGround() {
        return this.y < 220;
    }

    moveLeft = () => {
        this.x -= this.speedX;
    }

    hit() {
        if (!this.isHurt) {
            if (this.health <= 0) {
                this.health = 0;
            } else {
                this.isHurt = true;
                this.health -= 20;
                console.log('get Hit');
                setTimeout(() => {
                    this.isHurt = false;
                }, 1000);
                // this.lastHit = new Date().getTime();
            }
        }
    }


    playAnimation(pixArray) {
        let i = this.currentImage % pixArray.length;
        let path = pixArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    isDead() {
        return this.health == 0;
    }

    // isHurt() {
    //     let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    //     timepassed = timepassed / 1000; // Difference in s
    //     return timepassed < 2;
    // }

    isColliding(mO) {
        return this.x + this.width > mO.x &&
            this.y + this.height > mO.y &&
            this.x < mO.x + mO.width &&
            this.y < mO.y + this.height;
    }

    isCollidingOnTop(mO) {
        return this.x + this.width > mO.x &&
            this.y + this.height >= mO.y &&
            this.x < mO.x + mO.width &&
            this.y < mO.y + this.height;
    }

    moveRight() {

    }
    // #endregion
} 