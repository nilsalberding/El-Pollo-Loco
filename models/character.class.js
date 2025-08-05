import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Character extends MovableObject{



    constructor(){
        super().loadImage(Pix.mainChar.walk[0]);
        this.x = 120;
        this.y = 200;
        this.width = 100;
        this.height = 150;
        
    }

    // #region methods

    jump(){

    }
}