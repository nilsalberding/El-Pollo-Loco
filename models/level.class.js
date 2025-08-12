export class Level {

        // #region attributes

    enemies;
    clouds; 
    backgroundObjects;
    level_end_x = 2800;

        // #endregion

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}