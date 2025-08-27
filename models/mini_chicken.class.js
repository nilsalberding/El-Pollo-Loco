import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Chicken } from "./chicken.class.js";
import { MovableObject } from "./movable_object.class.js";

/**
 * creates a new MiniChicken as enemy
 * @class
 */
export class MiniChicken extends MovableObject {
    // #region attributes
    /**
     * health of Minichicken
     * @type {number}
     */
    health = 20;
    /**
     * y-coordinate
     * @type {number}
     */
    y = 360;
    /**
     * height of Minichicken
     * @type {number}
     */
    height = 60;
    /**
     * Collision offset values to adjust hitbox.
     * @type {{top:number,left:number,right:number,bottom:number}}
     */
    offset = {
        top: 8,
        left: 10,
        right: 10,
        bottom: 5
    }
    // #endregion
    /**
     * constructor set width, movement speed, load images and start Interval-functions
     */
    constructor() {
        super().loadImage(Pix.chickenSmall.walk[0])
        this.loadImages(Pix.chickenSmall.walk);
        this.loadImages(Pix.chickenSmall.dead);
        this.changeSpawnX();
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60)
        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60)
        this.speedX = 0.15 + Math.random() * 0.25;
        this.width = this.height * 0.98;
    }

    /**
     * set movement for Minichicken
     * @method
     */
    moveLeft = () => {
        if (!this.isDead()) {
            this.x -= this.speedX;
        }
    }
    
    /**
     * set animations for Minichicken
     * @method
     */
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(Pix.chickenSmall.dead);
        } else {
            this.playAnimation(Pix.chickenSmall.walk);
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
}