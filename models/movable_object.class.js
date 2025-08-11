import { IntervalHub } from "../js/intervall_hub.class.js";
// import { Character } from "./character.class.js";
// import { Chicken } from "./chicken.class.js";


export class MovableObject {
    x;
    y;
    speedX;
    speedY = 0;
    acceleration = 1;
    img;
    height;
    width;
    currentImage = 0;
    imageCache = [];
    otherDirection = false
    health;

    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    isAboveGround() {
        return this.y < 220;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {

        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(pixArray) {
        let i = this.currentImage % pixArray.length;
        let path = pixArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveLeft = () => {
        this.x -= this.speedX;
    }

    hit() {
        this.health -= 5;
        if(this.health <= 0) {
            this.health = 0;
        }
    }

    isDead() {
        return this.health == 0;
    }

    // showRectangle(ctx) {
    //     if (this instanceof Character || this instanceof Chicken) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '3';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    isColliding(mO) {
        return this.x + this.width > mO.x &&
        this.y + this.height > mO.y &&
        this.x < mO.x &&
        this.y < mO.y + this.height;
    }

    moveRight() {

    }
}