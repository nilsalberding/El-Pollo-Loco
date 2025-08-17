import { Pix } from "../js/pix.class.js";
import { Statusbar } from "./statusbar.class.js";

export class Coinbar extends Statusbar {
    percentage = 0;
    y = 80;

    constructor() {
        super();
        this.loadImages(Pix.status.coin);
        this.setPercentage(0, Pix.status.coin);
    }
}