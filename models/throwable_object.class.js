import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class ThrowableObject extends MovableObject {


    

    constructor(x, y) {
        super().loadImage(Pix.bottle.rotation[0]);
        this.loadImages(Pix.bottle.rotation);
        this.height = 100;
        this.width = this.height;
        this.speedX = 10;
        this.speedY = 15;
        this.throw(x, y);
        IntervalHub.startInterval(this.animations, 1000 / 30);

    }

    // #region methods

    throw(x, y) {
        this.x = x;
        this.y = y;
        IntervalHub.startInterval(this.throwRange, 1000 / 30);
    }

    throwRange = () => {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= this.acceleration;

    }

    animations = () => {

        this.playAnimation(Pix.bottle.rotation);
    }


    // #endregion
}

// TODO : Flaschen erzeugen zum einsammeln + nur Werfen, wenn sie vorhanden sind