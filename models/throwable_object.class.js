import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Character } from "./character.class.js";
import { MovableObject } from "./movable_object.class.js";

/**
 * creates an new throwable Object
 * @class
 */
export class ThrowableObject extends MovableObject {
    // #region attributes
    /**
     * height of Object
     * @type {number}
     */
    height = 100;
    /**
     * movement speed on x-coordinate
     * @type {number}
     */
    speedX = 10;
    /**
     * movement speed on y-coordinate
     * @type {number}
     */
    speedY = 15;
    /**
     * Collision offset values to adjust hitbox.
     * @type {{top:number,left:number,right:number,bottom:number}}
     */
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    }
    /**
     * flag, gets true if Object is colliding 
     */
    isBroken = false;
    // #endregion
    /**
     * constructor load Images, set width, start Interval-functions and activates throw-method
     * @param {number} x - x-coordinate of character
     * @param {number} y - y-coordinate of character
     */
    constructor(x, y) {
        super().loadImage(Pix.bottle.rotation[0]);
        this.loadImages(Pix.bottle.rotation);
        this.loadImages(Pix.bottle.splash);
        this.width = this.height;
        this.x = x;
        this.y = y;
        this.throw();
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.animations, 1000 / 30);
    }
    // #region methods
    /**
     * choose, which direction the bottle is flying
     * @method
     */
    throw() {
        if (Character.LOOKLEFT) {
            IntervalHub.startInterval(this.throwLeft, 1000 / 60);
        } else {
            IntervalHub.startInterval(this.throwRight, 1000 / 60);
        }
    }
    /**
     * throw bottle in left direction
     * @method
     */
    throwLeft = () => {
        if (!this.isBroken) {
            this.x -= this.speedX;
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }
    /**
     * throw bottle in right direction
     * @method
     */
    throwRight = () => {
        if (!this.isBroken) {
            this.x += this.speedX;
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }
    /**
     * set animations for throwable Object
     * @method
     */
    animations = () => {
        if (this.isBroken) {
            this.playAnimation(Pix.bottle.splash);
        } else {
            this.playAnimation(Pix.bottle.rotation);
        }
    }
    // #endregion
}

