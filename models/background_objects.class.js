import { MovableObject } from "./movable_object.class.js";

export class BackgroundObject extends MovableObject {

    y = 0;
    height = 480;
    width = 1440;  

    constructor(imagePath, x){
        super().loadImage(imagePath);

        this.x = x;


    }
}