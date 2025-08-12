import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Endboss extends MovableObject {

    constructor() {
        super().loadImage(Pix.boss.alert[0]);
        this.loadImages(Pix.boss.alert)
        this.x = 500;
        this.y = 180;
        this.height = 250;
        this.width = this.height * 0.86;
        IntervalHub.startInterval(this.animate, 1000 / 5);


    }

        // #region methods

    animate = () => {
        this.playAnimation(Pix.boss.alert);
    }

        // #endregion
}