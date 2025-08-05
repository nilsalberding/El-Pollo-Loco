import { Pix } from "../js/pix.class";
import { MovableObject } from "./movable_object.class";

export class Cloud extends MovableObject{


    constructor(){
        super().loadImage(Pix.cloud[0])

        this.x = 500;
        this.y = 20;
    }
}