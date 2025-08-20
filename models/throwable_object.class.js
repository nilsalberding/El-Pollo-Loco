import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Character } from "./character.class.js";
import { MovableObject } from "./movable_object.class.js";

export class ThrowableObject extends MovableObject {

    // #region attributes
    height = 100;
    speedX = 10;
    speedY = 15;
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    }
    isBroken = false;


    // #endregion

    constructor(x, y) {
        super().loadImage(Pix.bottle.rotation[0]);
        this.loadImages(Pix.bottle.rotation);
        this.loadImages(Pix.bottle.splash);
        this.width = this.height;
        this.throw(x, y);
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.animations, 1000 / 30);

    }

    // #region methods

    throw(x, y) {
        this.x = x;
        this.y = y;
        IntervalHub.startInterval(this.throwRange, 1000 / 30);
    }

    throwRange = () => { // BUG : flasche ändert ihre Richtung während des Flugs, wenn pepe sich dreht
        if (!this.isBroken) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            if (Character.LOOKLEFT) {
                this.x -= this.speedX;
            } else {
                this.x += this.speedX;
            }
        }
    }

    animations = () => {
        if (this.isBroken) {
            this.playAnimation(Pix.bottle.splash);
        } else {
            this.playAnimation(Pix.bottle.rotation);
        }
    }


    // #endregion
}

