import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Statusbar } from "./statusbar.class.js";

/**
 * creates a new statusbar which shows health of boss
 * @class
 */
export class HealthBarBoss extends Statusbar {
    // #region attributes
    /**
     * x-coordinate
     * @type {number}
     */
    x = 520;
    /**
     * y-coordinate
     * @type {number}
     */
    y = 5;
    /**
     * bosshealth
     * @type {number}
     */
    static BossHealth = 100;
    // #endregion

    /**
     * constructor load Images of healthbar and start Intervalfunction
     */
    constructor() {
        super();
        this.loadImages(Pix.status.healthBoss);
        this.setPercentage(100, Pix.status.healthBoss)
        IntervalHub.startInterval(this.setBossPercentage, 1000 / 60)
    }

    /**
     * update the image for bosshealthbar
     * @method
     */
    setBossPercentage = () => {
        this.percentage = HealthBarBoss.BossHealth;
        let path = Pix.status.healthBoss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}