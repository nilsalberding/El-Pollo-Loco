import { Pix } from "../js/pix.class.js";
import { BackgroundObject } from "./background_objects.class.js";
import { Bottle } from "./bottle.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Coin } from "./coin.class.js";
import { MiniChicken } from "./mini_chicken.class.js";

/**
 * creates a new level for the game
 * @class
 */
export class Level {
    // #region attributes
    /**
     * enemies of level
     * @type {string|Array.<string>}
     */
    enemies;
    /**
     * clouds of level
     * @type {string|Array.<string>}
     */
    clouds;
    /**
     * background-objects of level
     * @type {string|Array.<string>}
     */
    backgroundObjects;
    /**
     * collectibles of level
     * @type {string|Array.<string>}
     */
    collectibles;
    /**
     * x-coordinate fo the level-end
     * @type {number}
     */
    level_end_x = 4000;
    // #endregion

    /**
     * constructor sets most of all drawablwe objects to level
     */
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
            new MiniChicken()
        ];
        this.clouds = [
            new Cloud(),
            new Cloud(),
            new Cloud()
        ];
        this.collectibles = {
            coins: [
                new Coin(250, 150),
                new Coin(500, 150),
                new Coin(780, 250),
                new Coin(1200, 250),
                new Coin(1400, 150),
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
        };
        this.backgroundObjects = [];
        this.setBackgrounds()
    }

    /**
     * set Background for level
     * @method
     */
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
