import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Collectibles } from "./collectibles.class.js";


export class Bottle extends Collectibles {

    y = 350;
    height = 80;
    width = this.height;
    offset = {
        top: 15,
        left: 35,
        right: 20,
        bottom: 10
    }
    static bottlePercentage = 0;

    constructor(pX) {
        super().loadImage(Pix.bottle.ground[0]);
        this.x = pX;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }
}