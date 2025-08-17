import { Pix } from "../js/pix.class.js";
import { Statusbar } from "./statusbar.class.js";

export class HealthBar extends Statusbar {
    percentage = 100;
    y = 0;

    constructor() {
        super();
        this.loadImages(Pix.status.health);
        this.setPercentage(100, Pix.status.health);
    }
}