import { MovableObject } from "./movable_object.class.js";

export class BackgroundObject extends MovableObject {

    

    constructor(imagePath){
        super().loadImage(imagePath);

        this.x = 0
        this.y = 0
        this.height = 480;
        this.width = 1440;

    }
}