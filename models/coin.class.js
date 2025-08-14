import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Collectibles } from "./collectibles.class.js";

export class Coin extends Collectibles {

    height = 130;
    width = this.height;
    offset = {
        top: 45,
        left: 45,
        right: 45,
        bottom: 45,
    }

    constructor(pX, pY){
        super().loadImage(Pix.coin[0]);
        this.loadImages(Pix.coin);
        this.x = pX;
        this.y = pY;
        IntervalHub.startInterval(this.animate, 1000 / 4);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }

    animate = () => {
        this.playAnimation(Pix.coin)
    }
}