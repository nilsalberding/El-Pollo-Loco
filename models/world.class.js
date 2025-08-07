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

    clouds = [
        new Cloud()
    ]

    backgroundObjects = [
        new BackgroundObject(Pix.backgrounds.air),
        new BackgroundObject(Pix.backgrounds.thirdlayer),
        new BackgroundObject(Pix.backgrounds.secondLayer),
        new BackgroundObject(Pix.backgrounds.firstLayer)
    ]

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
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        
        this.ctx.translate(-this.camera_x, 0);

        // draw()wird immer wieder aufgerufen
        const self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
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

