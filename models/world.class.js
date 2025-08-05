import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";

export class World {

    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
];


draw() {

}
}