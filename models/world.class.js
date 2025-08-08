import { Pix } from "../js/pix.class.js";
import { level1 } from "../level/level1.js";
import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { BackgroundObject } from "./background_objects.class.js";
import { Cloud } from "./cloud.class.js";
import { Level } from "./level.class.js";

export class World {

    character = new Character();
    level = level1;
    // enemies = level1.enemies;
    // clouds = level1.clouds;
    // backgroundObjects = level1.backgroundObjects;

    canvas;    
    ctx;
    camera_x = 0;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;        
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        
        this.ctx.translate(-this.camera_x, 0);

        // draw()wird immer wieder aufgerufen
        // const self = this;
        // requestAnimationFrame(function () {
        //     self.draw();
        // })

        requestAnimationFrame(() => this.draw());
    }

    addToMap(mO) {
        if(mO.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mO.width, 0);
            this.ctx.scale(-1, 1);
            mO.x = mO.x * -1;
        }
        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height)
        if(mO.otherDirection) {
            this.ctx.restore();
            mO.x = mO.x * -1;
        }
    };

    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })};
}

