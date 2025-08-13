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
        this.backgroundObjects = [
                new BackgroundObject(Pix.backgrounds.air, -1440),
                new BackgroundObject(Pix.backgrounds.thirdlayer, -1440),
                new BackgroundObject(Pix.backgrounds.secondLayer, -1440),
                new BackgroundObject(Pix.backgrounds.firstLayer, -1440),
        
                new BackgroundObject(Pix.backgrounds.air, 0),
                new BackgroundObject(Pix.backgrounds.thirdlayer, 0),
                new BackgroundObject(Pix.backgrounds.secondLayer, 0),
                new BackgroundObject(Pix.backgrounds.firstLayer, 0),
        
                new BackgroundObject(Pix.backgrounds.air, 1440),
                new BackgroundObject(Pix.backgrounds.thirdlayer,1440),
                new BackgroundObject(Pix.backgrounds.secondLayer, 1440),
                new BackgroundObject(Pix.backgrounds.firstLayer, 1440),
        
                new BackgroundObject(Pix.backgrounds.air, 1440 * 2),
                new BackgroundObject(Pix.backgrounds.thirdlayer,1440 * 2),
                new BackgroundObject(Pix.backgrounds.secondLayer, 1440 * 2),
                new BackgroundObject(Pix.backgrounds.firstLayer, 1440 * 2),
        
                new BackgroundObject(Pix.backgrounds.air, 1440 * 3),
                new BackgroundObject(Pix.backgrounds.thirdlayer,1440 * 3),
                new BackgroundObject(Pix.backgrounds.secondLayer, 1440 * 3),
                new BackgroundObject(Pix.backgrounds.firstLayer, 1440 * 3)
        
            ];
    }
}
