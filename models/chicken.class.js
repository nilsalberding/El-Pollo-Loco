import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

/**
 * Creates a new Chicken-enemy
 * @class
 */
export class Chicken extends MovableObject {

    // #region attributes

    /**
     * shows spawn-point of the first instance
     * @static
     */
    static spawnX = 600;
    /**
     * shows health of the chicken
     */
    health = 20;
    /**
     * shows y-coordinate of chicken
     */
    y = 360;
    /**
     * shows height of the image
     */
    height = 60;
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
    // #endregion

    /**
     * constructor loads images, start the intervals, and get values for image-width, spawn-point and movement-speed.
     */
    constructor() {
        super().loadImage(Pix.chickenNormal.walk[0]);
        this.loadImages(Pix.chickenNormal.walk);
        this.loadImages(Pix.chickenNormal.dead);
        this.startChickenIntervals();
        this.changeSpawnX();
        this.width = this.height * 0.98;
        this.speedX = 0.15 + Math.random() * 0.25;
    }

    // #region methods

    /**
     * makes the chicken move left
     * @method
     */
    moveLeft = () => {
        if (!this.isDead()) {
            this.x -= this.speedX;
        }
    }

    /**
     * set animations of chicken
     * @method
     */
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(Pix.chickenNormal.dead);
        } else {
            this.playAnimation(Pix.chickenNormal.walk);
        }
    }

    /**
     * value the new spawn-point of every new instance of chickens.
     * @method
     */
    changeSpawnX() {
        this.x = Chicken.spawnX;
        Chicken.spawnX += Math.random() * 200 + 60;
    }

    /**
     * start the Intervals of the methods which are necessary for chicken
     * @method
     */
    startChickenIntervals() {
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60)
        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
        IntervalHub.startInterval(this.playDeadSound, 1000 / 30);
    }

    // #endregion
}