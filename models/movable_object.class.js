import { IntervalHub } from "../js/intervall_hub.class.js";

export class MovableObject {
    x;
    y;
    speedX;
    img;
    height;
    width;
    currentImage = 0;
    imageCache = [];



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


    moveLeft = () => {
            this.x -= this.speedX;
    }

    moveRight() {

    }
}