import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Chicken extends MovableObject {

    // #region attributes
    static spawnX = 400;
    health = 20;
    y = 360;
    height = 60;
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    }
    

    // #endregion
    constructor() {
        super().loadImage(Pix.chickenNormal.walk[0]);
        this.loadImages(Pix.chickenNormal.walk);
        this.loadImages(Pix.chickenNormal.dead);
        this.changeSpawnX();
        this.width = this.height * 0.98;
        this.speedX = 0.15 + Math.random() * 0.25;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60)
        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60);

        console.log(this);
        
    }

    // #region methods

    moveLeft = () => {
        if (!this.isDead()){
            this.x -= this.speedX;
    }}


    animate = () => {
        if (this.isDead()){
            this.playAnimation(Pix.chickenNormal.dead);
        } else {
            this.playAnimation(Pix.chickenNormal.walk);
        }
            
        
    }

    changeSpawnX() {
        this.x = Chicken.spawnX;
        Chicken.spawnX += Math.random() * 200 + 60;
    }

    // #endregion
}