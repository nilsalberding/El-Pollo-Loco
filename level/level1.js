import { Pix } from "../js/pix.class.js";
import { BackgroundObject } from "../models/background_objects.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Level } from "../models/level.class.js";


export const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud()
    ], 
    [
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

    ]
)
