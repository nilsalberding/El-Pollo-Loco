import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Collectibles } from "./collectibles.class.js";

/**
 * creates a new coin to collect
 * @class
 */
export class Coin extends Collectibles {
    // #region attributes
    /**
     * set height of coin-image
     */
    height = 130;
    
    /**
    * Collision offset values to adjust hitbox.
    * @type {{top:number,left:number,right:number,bottom:number}}
    */
    offset = {
        top: 45,
        left: 45,
        right: 45,
        bottom: 45,
    }
    /**
     * percentage of coins which are collect
     * @static
     */
    static coinPercentage = 0;
    // #endregion

    /**
     * constructor set coordinates of a coin, load images and starts intervall for animation and offset.
     * @param {number} pX - x-coordinate of coin 
     * @param {number} pY - y-coordinate of coin
     */
    constructor(pX, pY){
        super().loadImage(Pix.coin[0]);
        this.loadImages(Pix.coin);    
        this.width = this.height;
        this.x = pX;
        this.y = pY;
        IntervalHub.startInterval(this.animate, 1000 / 4);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    /**
     * animate the coin
     * @method
     */
    animate = () => {
        this.playAnimation(Pix.coin)
    }
}
