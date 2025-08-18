import { IntervalHub } from "../js/intervall_hub.class.js";
import { DrawableObject } from "./drawable_object.class.js";


export class MovableObject extends DrawableObject {

    // #region attributes
    speedX;
    speedY = 0;
    acceleration = 1;

    otherDirection = false;
    health;
    isHurt = false;
    rX;
    rY;
    rW;
    rH;
    offset;

    // #endregion

    // #region methods

    getRealFrame = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    isAboveGround() {
        return this.y + this.height < 420;
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
                setTimeout(() => {
                    this.isHurt = false;
                }, 1000);
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

    isColliding(mO) {
        return this.rX + this.rW > mO.rX &&
            this.rY + this.rH > mO.rY &&
            this.rX < mO.rX + mO.rW &&
            this.rY < mO.rY + this.rH;
    }

    // #endregion
} 