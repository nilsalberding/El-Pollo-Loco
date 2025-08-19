import { DrawableObject } from "./drawable_object.class.js";

export class Statusbar extends DrawableObject {

    // #region attributes
    percentage = 100;
    x = 20;
    height = 50;
    width = this.height * 3.766;
    y;
    // #endregion

    constructor() {
        super();

    }

    // #region methods

    setPercentage(percentage, pixArray) {
        this.percentage = percentage;
        let path = pixArray[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        }
        if (this.percentage >= 80) {
            return 4;
        }
        if (this.percentage >= 60) {
            return 3;
        }
        if (this.percentage >= 40) {
            return 2;
        }
        if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    // #endregion
}