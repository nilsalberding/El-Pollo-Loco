import { Pix } from "../js/pix.class.js";
import { Statusbar } from "./statusbar.class.js"

export class BottleBar extends Statusbar {
    percentage = 0;
    y = 40;

    constructor() {
        super();
        this.loadImages(Pix.status.bottle);
        this.setPercentage(0, Pix.status.bottle);
    }
}