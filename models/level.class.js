import { Pix } from "../js/pix.class.js";
import { BackgroundObject } from "./background_objects.class.js";
import { Bottle } from "./bottle.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Coin } from "./coin.class.js";
import { Endboss } from "./endboss.class.js";
import { MiniChicken } from "./mini_chicken.class.js";

export class Level {

    // #region attributes

    enemies;
    clouds;
    backgroundObjects;
    collectibles = {
        coins: [
            new Coin(250, 150),
            new Coin(500, 150),
            new Coin(780, 250),
            new Coin(1200,250),
            new Coin(1400,150),
        ],
        bottles: [
            new Bottle(300), 
            new Bottle(400),
            new Bottle(500),
            new Bottle(550),
            new Bottle(620),
            new Bottle(900),
            new Bottle(1050),
            new Bottle(1200),
            new Bottle(1430),
            new Bottle(1600),
        ]

    }
    level_end_x = 2800;

    // #endregion

    constructor() {
        this.enemies = [
            new Chicken(),
            new MiniChicken(),
            new Chicken(),
            new Chicken(),
            new MiniChicken(),
            new Chicken(),
            new MiniChicken(),
            new Chicken(),
            new Chicken(),
            new MiniChicken(),
            new Chicken(),
            new MiniChicken(),
            new Chicken(),
            new Chicken(),
            new MiniChicken(),
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
