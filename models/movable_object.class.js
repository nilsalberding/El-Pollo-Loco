import { AudioHub } from "../js/audiohub.class.js";
import { IntervalHub } from "../js/intervall_hub.class.js";
import { DrawableObject } from "./drawable_object.class.js";

/**
 * creates a new Movable Object.
 * @class
 */
export class MovableObject extends DrawableObject {

    // #region attributes
    /**
     * movement-speed on x-axis
     * @type {number}
     */
    speedX;
    /**
     * movement-speed on y-axis
     * @type {number}
     */    
    speedY = 0;
    /**
     * gravity-acceleration
     * @type {number}
     */
    acceleration = 1; 
    /**
     * health of the Object
     * @type {number}
     */
    health;
    /**
     * x-coordinate for hitbox
     * @type {number}
     */
    rX;
    /**
     * y-coordinate for hitbox
     * @type {number}
     */
    rY;
    /**
     * width for hitbox
     * @type {number}
     */
    rW;
    /**
     * height for hitbox
     * @type {number}
     */
    rH;
    /**
     * Collision offset values to adjust hitbox.
     * @type {{top:number,left:number,right:number,bottom:number}}
     */
    offset;
    /**
     * flag, if sound of death played once
     * @type {boolean}
     */
    deadSoundPlayed = false;
    /**
     * flag, if Object looks into other direction
     * @type {boolean}
     */
    otherDirection = false;
    /**
     * flag shows, if object is hurt in this moment
     * @type {boolean}
     */
    isHurt = false;
    // #endregion

    // #region methods

    /**
     * values the hitbox
     * @method
     */
    getRealFrame = () => {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }
    /**
     * gives the object gravitiy movement
     * @method
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }
    /**
     * 
     * @returns , if Object is above ground
     * @method
     */
    isAboveGround() {
        return this.y + this.height < 420;
    }
    /**
     * add movement to the left for objects
     * @method
     */
    moveLeft = () => {
        this.x -= this.speedX;
    }
    /**
     * set damage to objects and set flag "isHurt"
     * @method
     */
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
    /**
     * play Animation with Images of an Array
     * @param {string|Array<string>} pixArray - Array with Images
     * @method
     */
    playAnimation(pixArray) {
        let i = this.currentImage % pixArray.length;
        let path = pixArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    /**
     * 
     * @returns if Object-health is dead.
     * @method
     */
    isDead() {
        return this.health == 0;
    }
    /**
     * 
     * @param {Object} mO the Object this is colliding with
     * @returns if this Instance is colliding with another movable Object
     * @method
     */
    isColliding(mO) {
        return this.rX + this.rW > mO.rX &&
            this.rY + this.rH > mO.rY &&
            this.rX < mO.rX + mO.rW &&
            this.rY < mO.rY + this.rH;
    }
    // #endregion
} 