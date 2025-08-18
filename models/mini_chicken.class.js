import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Chicken } from "./chicken.class.js";


import { MovableObject } from "./movable_object.class.js";

export class MiniChicken extends MovableObject {

    health = 20;
    y = 360;
    height = 60;
    width = this.height * 0.98;
    offset = {
        top: 8,
        left: 10,
        right: 10,
        bottom: 5
    }

    constructor() {
        super().loadImage(Pix.chickenSmall.walk[0])
        this.loadImages(Pix.chickenSmall.walk);
        this.loadImages(Pix.chickenSmall.dead);
        this.changeSpawnX();
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60)
        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.moveLeft, 1000 / 60)
        this.speedX = 0.15 + Math.random() * 0.25;
    }

    moveLeft = () => {
        if (!this.isDead()) {
            this.x -= this.speedX;
        }
    }

    animate = () => {
        if (this.isDead()) {
            this.playAnimation(Pix.chickenSmall.dead);
        } else {
            this.playAnimation(Pix.chickenSmall.walk);

        }
    }
    changeSpawnX() {
        this.x = Chicken.spawnX;
        Chicken.spawnX += Math.random() * 200 + 60;
    }

}