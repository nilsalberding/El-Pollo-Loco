export class DrawableObject {

    // #region attributes
    x;
    y;
    img;
    height;
    width;
    currentImage = 0;
    imageCache = [];

    // #endregion

    // #region methods

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

    // #endregion
}