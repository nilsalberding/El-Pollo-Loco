import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Character extends MovableObject{

    

    constructor(){
        super().loadImage(Pix.mainChar.walk[0]);
        this.loadImages(Pix.mainChar.walk)
        this.x = 80;
        this.y = 220;
        this.height = 200;
        this.width = this.height * 0.5083;
        this.animate(Pix.mainChar.walk, 1000 / 12);       
        
    }

    // #region methods



    jump(){

    }
}