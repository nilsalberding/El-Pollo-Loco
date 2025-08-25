import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";


/**
 * creates new Cloud
 */
export class Cloud extends MovableObject{

    // #region attributes
    
    /**
     * set y-coordinate of cloud
     */
    y = 0;
    /**
     * set width of cloud-image
     */
    width = 1440;
    /**
     * set height of cloud-image
     */
    height = 480;
    /**
     * set speed of cloud-movement
     */
    speedX = 0.15;
    /**
     * set the x-coordinate of cloud. 
     * @static
     */
    static spawnX = 0
    // #endregion

    /**
     * constructor loads image of cloud, the the new x-coordinate of the instance and start interval for movement
     */
    constructor(){
        super().loadImage(Pix.backgrounds.cloud);
        this.changeSpawnX();
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);
    }


// #region methods
    /**
     * values the new spawn-point of every new instance of cloud
     * @method
     */
    changeSpawnX() {
        this.x = Cloud.spawnX;
        Cloud.spawnX += this.width;
    }
    // #endregion
}