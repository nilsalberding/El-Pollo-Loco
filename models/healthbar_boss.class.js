import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Statusbar } from "./statusbar.class.js";

export class HealthBarBoss extends Statusbar {
    
    x = 520;
    y = 5;
    static BossHealth = 100;

    constructor() {
        super();
        this.loadImages(Pix.status.healthBoss);
        this.setPercentage(100, Pix.status.healthBoss)
        IntervalHub.startInterval(this.setBossPercentage, 1000 / 60)
    }

    setBossPercentage = () => {
        this.percentage = HealthBarBoss.BossHealth;
        let path = Pix.status.healthBoss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}