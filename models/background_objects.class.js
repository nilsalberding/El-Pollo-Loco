import { MovableObject } from "./movable_object.class.js";

/**
 * Creates a new Background Object.
 * @class
 */
export class BackgroundObject extends MovableObject {

    y = 0;
    height = 480;
    width = 1440;  

    /**
     * 
     * @param {string} imagePath - Relative Path of the Image. 
     * @param {number} x - X-Coordinate of the Background-Image
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
    }
}