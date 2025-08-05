import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Character extends MovableObject{



    constructor(){
        super().loadImage(Pix.mainChar.walk[0]);
        this.x = 80;
        this.y = 200;
        this.height = 200;
        this.width = this.height * 0.5083;
        
        
    }

    // #region methods

    jump(){

    }
}