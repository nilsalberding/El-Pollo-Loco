import { DrawableObject } from "./drawable_object.class.js";

/**
 * creates a new statusbar
 * @class
 */
export class Statusbar extends DrawableObject {
    // #region attributes
    /**
     * percentage of statusbar
     * @type {number}
     */
    percentage = 100;
    /**
     * x-coordinate
     * @type {number}
     */
    x = 20;
    /**
     * height of statusbar
     * @type {number}
     */
    height = 50;
    /**
     * y-coordinate
     * @type {number}
     */
    y;
    // #endregion
    /**
     * creates instance of a statusbar
     */
    constructor() {
        super();
    }
    // #region methods
    /**
     * set new image to statusbar
     * @param {number} percentage - update the percentage of statusbar 
     * @param {string|Array.<string>} pixArray - Array with image-path's
     * @method
     */
    setPercentage(percentage, pixArray) {
        this.percentage = percentage;
        let path = pixArray[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.width = this.height * 3.766;
    }
    /**
     * returns the correct Index for setPercentage-method
     * @returns return index
     * @method
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        }
        if (this.percentage >= 80) {
            return 4;
        }
        if (this.percentage >= 60) {
            return 3;
        }
        if (this.percentage >= 40) {
            return 2;
        }
        if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
    // #endregion
}