import { Pix } from "../js/pix.class.js";
import { Statusbar } from "./statusbar.class.js";

/**
 * create the Healthbar for character
 * @class
 */
export class HealthBar extends Statusbar {
    // #region attributes
    /**
     * status of healthbar
     * @type {number}
     */
    percentage = 100;
    /**
     * y-coordinate
     * @type {number}
     */
    y = 0;

    /**
     * constructor load images of healthbar and update the first status
     */
    constructor() {
        super();
        this.loadImages(Pix.status.health);
        this.setPercentage(100, Pix.status.health);
    }
}