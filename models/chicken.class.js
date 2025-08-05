import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Chicken extends MovableObject {

    constructor(){
        super().loadImage(Pix.chickenNormal.walk[0])
    }
}