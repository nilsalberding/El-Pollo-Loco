import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

/**
 * Creates a Bottle to collect.
 * @class
 */
export class Bottle extends MovableObject {

    y = 350;
    height = 80;
    width = this.height;
    offset = {
        top: 15,
        left: 35,
        right: 20,
        bottom: 10
    }
    static bottlePercentage = 0;

    /**
     * 
     * @param {number} pX - The x-coordinate of the Bottle. 
     */
    constructor(pX) {
        super().loadImage(Pix.bottle.ground[0]);
        this.x = pX;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    /**
     * Returns, if Bottle-inventory can be stored.
     * @returns {boolean} 
     */
    static canBeStored() {
        return Bottle.bottlePercentage < 100;
    }
}