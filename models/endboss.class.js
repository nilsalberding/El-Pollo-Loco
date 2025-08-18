import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { HealthBarBoss } from "./healthbar_boss.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Endboss extends MovableObject {

    x = 500;
    y = 180;
    height = 250;
    health = 100;


    offset = {
        top: 80,
        left: 40,
        right: 30,
        bottom: 10
    }

    static ATTACK_COUNTER = 0;



    constructor() {
        super().loadImage(Pix.boss.alert[0]);
        this.loadImages(Pix.boss.alert);
        this.loadImages(Pix.boss.dead);
        this.loadImages(Pix.boss.attack);
        this.loadImages(Pix.boss.hurt);
        this.width = this.height * 0.86;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.attack, 1000 / 0.5);
        IntervalHub.startInterval(this.setHealthbar, 1000 / 1);

        IntervalHub.startInterval(this.animate, 1000 / 5);
    }

    // #region methods

    animate = () => {
        if (this.isDead()) {
            this.playAnimation(Pix.boss.dead);
        }else if (this.isHurt) {
            this.playAnimation(Pix.boss.hurt);
        }else if (this.attackReady()) {
            this.playAnimation(Pix.boss.attack);
        } else {
            this.playAnimation(Pix.boss.alert);
        }
    }

    attackReady() {
        return Endboss.ATTACK_COUNTER % 3 == 0;
    }

    attack = () => {
        Endboss.ATTACK_COUNTER++
        if (this.attackReady()) {
            this.x -= 130;
            setTimeout(() => {
                this.x += 70;
            }, 200);
        }
    }

    setHealthbar = () => {
        
        
    }



    // #endregion
}