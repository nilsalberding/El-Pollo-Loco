import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { level1 } from "../level/level1.js";
import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { BackgroundObject } from "./background_objects.class.js";
import { Cloud } from "./cloud.class.js";
import { Level } from "./level.class.js";
import { Statusbar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable_object.class.js";



export class World {

    character = new Character();
    healthbar = new Statusbar(Pix.status.health, 0);
    bottlebar = new Statusbar(Pix.status.bottle, 40);
    coinbar = new Statusbar(Pix.status.coin, 80);
    throwableObject = [];

    level = level1;

    canvas;
    ctx;
    camera_x = 0;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.checkCollisions, 1000 / 5);
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthbar.setPercentage(this.character.health, Pix.status.health);

            }
        })
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        // #region for fixed Objects
        this.addToMap(this.healthbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.coinbar);
        // #endregion
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    addToMap(mO) {
        if (mO.otherDirection) {
            this.flipImage(mO);
        }

        this.showRectangle(mO);

        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height)
        if (mO.otherDirection) {
            this.flipImageBack(mO);
        }
    };

    showRectangle(mO) {
        if (mO instanceof Character || mO instanceof Chicken) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(mO.x, mO.y, mO.width, mO.height);
            this.ctx.stroke();
        }
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    };

    flipImage(mO) {
        this.ctx.save();
        this.ctx.translate(mO.width, 0);
        this.ctx.scale(-1, 1);
        mO.x = mO.x * -1;
    }

    flipImageBack(mO) {
        this.ctx.restore();
        mO.x = mO.x * -1;
    }
}

