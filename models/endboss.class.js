import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Endboss extends MovableObject {

    x = 500;
    y = 180;
    height = 250;

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }



    constructor() {
        super().loadImage(Pix.boss.alert[0]);
        this.loadImages(Pix.boss.alert)
        this.width = this.height * 0.86;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);

        IntervalHub.startInterval(this.animate, 1000 / 5);


    }

    // #region methods

    animate = () => {
        this.playAnimation(Pix.boss.alert);
    }

    // #endregion
}