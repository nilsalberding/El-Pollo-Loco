export class MovableObject {
    x;
    y;
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

    animate(pixArray, timer) {
        setInterval(() => {
            let i = this.currentImage % pixArray.length;
            let path = pixArray[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, timer)
    }

    moveRight() {

    }
}