import { Pix } from "../js/pix.class.js";
import { Statusbar } from "./statusbar.class.js";

/**
 * creates a new statusbar, which shows the amount of collected coins.
 * @class
 */
export class Coinbar extends Statusbar {

    // #region attributes
    /**
     * shows the percentage of collected coins
     * @type {number}
     */
    percentage = 0;
    /**
     * the y-coordinate of the coinbar
     * @type {number}
     */
    y = 80;
// #endregion

    /**
     * constructor load images and set first picture of coinbar on zero.
     */
    constructor() {
        super();
        this.loadImages(Pix.status.coin);
        this.setPercentage(0, Pix.status.coin);
    }
}