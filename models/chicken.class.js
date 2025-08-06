import { Pix } from "../js/pix.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Chicken extends MovableObject {

    static spawnX = 500;

    constructor(){
        super().loadImage(Pix.chickenNormal.walk[0]);
        this.loadImages(Pix.chickenNormal.walk)
        this.changeSpawnX();
        this.y = 360;
        this.height = 60;
        this.width = this.height * 0.98;
        this.animate(Pix.chickenNormal.walk, 1000/10)
    }

    changeSpawnX() {
        this.x = Chicken.spawnX;
        Chicken.spawnX += Math.random() * 200 + 200;
    }
}