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
        if (Character.LOOKLEFT) {
            IntervalHub.startInterval(this.throwLeft, 1000 / 30);
        } else {
            IntervalHub.startInterval(this.throwRight, 1000 / 30);
        }
    }

    throwLeft = () => {
        if (!this.isBroken) {
            this.x -= this.speedX;
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }

    }

    throwRight = () => {
        if (!this.isBroken) {
            this.x += this.speedX;
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
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

