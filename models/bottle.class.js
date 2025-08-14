import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Collectibles } from "./collectibles.class.js";


export class Bottle extends Collectibles {

    y = 330;
    height = 100;
    width = this.height;
    offset = {
        top: 25,
        left: 50,
        right: 25,
        bottom: 10
    }
    static bottleCounter = 0;

    constructor(pX) {
        super().loadImage(Pix.bottle.ground[0]);
        this.x = pX;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
    }
}