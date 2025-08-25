/**
 * Super-class for MovableObjects and BackgroundObjects
 * @class
 */
export class DrawableObject {

    // #region attributes
    /**
     * set x-coordinate
     * @type {number}
     */
    x;
    /**
     * set y-coordinate
     * @type {number}
     */
    y;
    /**
     * contains current shown image of an object.
     * @type {string}
     */
    img;
    /**
     * height of the image
     * @type {number}
     */
    height;
    /**
     * width of the image
     * @type {number}
     */
    width;
    /**
     * counter for shown images
     * @type {number}
     */
    currentImage = 0;
    /**
     * array, which contains the images for the objects
     * @type {string|Array.<string>}
     */
    imageCache = [];
    // #endregion

    // #region methods
    /**
     * load single Image
     * @param {string} path - path
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * load images from an array with image-path´s
     * @param {string} arr - array with path´s of images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    // #endregion
}