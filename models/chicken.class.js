import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Chicken extends MovableObject {

    constructor(){
        super().loadImage(Pix.chickenNormal.walk[0])
        this.x = Math.random() * 500 + 200;
        this.y = 330;
        this.height = 60;
        this.width = this.height * 0.98;
    }
}