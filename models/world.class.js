import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";

export class World {

    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
];

    ctx;

constructor(canvas){
    this.ctx = canvas.getContext('2d');
    this.draw();
}

draw() {
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width)
}
}

ctx.drawImage(imgSrc, x, y, width, height)