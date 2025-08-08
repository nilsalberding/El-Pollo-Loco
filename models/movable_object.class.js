import { IntervalHub } from "../js/intervall_hub.class.js";

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

    applyGravity = () => {
        if(this.isAboveGround() || this.speedY > 0){
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

    moveRight() {

    }
}