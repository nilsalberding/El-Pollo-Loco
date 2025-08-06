import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Cloud extends MovableObject{


    constructor(){
        super().loadImage(Pix.backgrounds.cloud);

        this.x = 0;
        this.y = 0;
        this.width = 1440;
        this.height = 480;
        this.speedX = 0.15;
        this.moveLeft();
    }


// #region methods



}