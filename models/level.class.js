import { Pix } from "../js/pix.class.js";
import { BackgroundObject } from "./background_objects.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Endboss } from "./endboss.class.js";

export class Level {

    // #region attributes

    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2800;

    // #endregion

    constructor() {
        this.enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ];
        this.clouds = [
            new Cloud()
        ];
        this.backgroundObjects = [];
        this.setBackgrounds()
    }

    setBackgrounds() {
        for (let i = -1; i < 4; i++) {
            const setX = 1440 * i;

            this.backgroundObjects.push(new BackgroundObject(Pix.backgrounds.air, setX)),
            this.backgroundObjects.push(new BackgroundObject(Pix.backgrounds.thirdlayer, setX)),
            this.backgroundObjects.push(new BackgroundObject(Pix.backgrounds.secondLayer, setX)),
            this.backgroundObjects.push(new BackgroundObject(Pix.backgrounds.firstLayer, setX))
        }
    }
}
