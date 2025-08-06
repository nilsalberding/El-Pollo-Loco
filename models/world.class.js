import { Pix } from "../js/pix.class.js";
import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { BackgroundObject } from "./background_objects.class.js";
import { Cloud } from "./cloud.class.js";

export class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = new Cloud();
    backgroundObjects = [
        new BackgroundObject(Pix.backgrounds.air)
    ]

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);

        // draw()wird immer wieder aufgerufen
        const self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addToMap(mO) {
        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height)
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    }
}

