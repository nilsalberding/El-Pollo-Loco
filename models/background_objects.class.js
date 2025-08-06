import { MovableObject } from "./movable_object.class.js";

export class BackgroundObject extends MovableObject {

    constructor(imagePath){
        super().loadImage(imagePath);

    }
}