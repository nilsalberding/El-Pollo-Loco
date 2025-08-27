import { AudioHub } from "../js/audiohub.class.js";
import { toggleScreen } from "../js/game.js";
import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Bottle } from "./bottle.class.js";
import { BottleBar } from "./bottlebar.class.js";
import { Coin } from "./coin.class.js";
import { Coinbar } from "./coinbar.class.js";
import { Endboss } from "./endboss.class.js";
import { HealthBar } from "./healthbar.class.js";
import { HealthBarBoss } from "./healthbar_boss.class.js";
import { Level } from "./level.class.js";
import { MovableObject } from "./movable_object.class.js";

/**
 * creates the world of the game. 
 * @class
 */
export class World {
    // #region attributes
    /**
     * character of the World
     * @type {object}
     */
    character = new Character();
    /**
     * healthbar of character
     * @type {object}
     */
    healthbar = new HealthBar();
    /**
     * bottle-inventory of the character
     * @type {object}
     */
    bottlebar = new BottleBar();
    /**
     * healthbar of the Boss
     * @type {object}
     */
    healthbarBoss = new HealthBarBoss();
    /**
     * shows percentage of the collected coins
     * @type {object}
     */
    coinbar = new Coinbar();
    /**
     * contains the thrown bottles of the character
     * @type {Array|Array<object>}
     */
    throwableObject = [];
    /**
     * creates the level of the world
     * @type {object}
     */
    level = new Level();
    /**
     * canvas, where everything is drawing in
     */
    canvas;
    /**
     * context of the canvas
     */
    ctx;
    /**
     * x-coordinate of the shown context
     * @type {number}
     */
    camera_x = 0;
    // #endregion
    /**
     * Creates a new instance of the game world and initializes
     * the canvas, rendering context, and main game intervals.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game world is rendered.
     */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        this.resetValues();
        IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
        IntervalHub.startInterval(this.checkEndgame, 1000 / 1);
        IntervalHub.startInterval(this.spawnEndboss, 1000 / 30);
    }

    // #region methods

    /**
     * Set the reference at character-class from this world
     * @method
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Checks collisions between the character, enemies, and collectible objects.
     * - Handles jumping on enemies, taking damage, and hitting enemies with bottles.
     * - Collects coins and bottles when colliding with them.
     * @method
     */
    checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isFalling) {
                this.jumpOnEnemy(enemy);
            } else if (this.character.isColliding(enemy)) {
                this.characterDamage(enemy);
            }
            this.bottleOnEnemy(enemy);
        })
        this.collectCoin();
        this.collectBottle();
    }

    /**
     * Checks if the character is dead and triggers the endgame sequence if true.
     * - Stops all intervals and sounds.
     * - Plays the death sound.
     * - Switches to the loser screen after a short delay.
     * @method
     */
    checkEndgame = () => {
        if (this.character.isDead()) {
            setTimeout(() => {
                AudioHub.stopAll();
                AudioHub.playOne(AudioHub.CHR_DEAD);
                IntervalHub.stopAllIntervals();
                toggleScreen('loser-screen');
                toggleScreen('mobile-btns');
            }, 500)
        }
    }

    /**
     * Spawns the end boss if the character reaches a certain position
     * and has not yet triggered the first boss encounter.
     * @method
     */
    spawnEndboss = () => {
        if (this.character.x > 2500 && !this.character.firstContactBoss) {
            this.character.firstContactBoss = true;
            this.level.enemies.push(new Endboss);
            AudioHub.playOne(AudioHub.BOSS_APPR);
        }
    }

    /**
     * Handles the logic when the character jumps on an enemy.
     * - Plays sound effects.
     * - Damages the enemy.
     * - Makes the character perform a mini-jump.
     * @param {Object} _enemy - The enemy being jumped on.
     * @method
     */
    jumpOnEnemy(_enemy) {
        if (!_enemy.isDead()) {
            if (!_enemy.isHurt) {
                AudioHub.playOne(AudioHub.CHCKN_DEAD);
            }
            this.character.miniJump();
            _enemy.hit();
        }
    }

    /**
     * Handles the logic when the character takes damage from an enemy.
     * - Plays sound effects.
     * - Reduces character health and updates health bar.
     * - Pushes the character backwards depending on the direction faced.
     * @param {Object} _enemy - The enemy causing the damage.
     * @method
     */
    characterDamage(_enemy) {
        if (!_enemy.isDead()) {
            AudioHub.playOne(AudioHub.CHR_DMG);
            this.character.hit();
            this.character.lastMove = new Date().getTime();
            this.healthbar.setPercentage(this.character.health, Pix.status.health);
            if (this.character.otherDirection && this.character.isWalking()) {
                this.character.x += 50;
            } else {
                this.character.x -= 50;
            }
        }
    }

    /**
     * Handles bottle collisions with enemies.
     * - Damages the enemy when hit.
     * - Marks the bottle as broken.
     * - Removes the bottle after a short delay.
     * @param {Object} _enemy - The enemy being hit by a bottle.
     * @method
     */
    bottleOnEnemy(_enemy) {
        this.throwableObject.forEach((bottle) => {
            if (bottle.isColliding(_enemy) && !_enemy.isDead()) {
                _enemy.hit();
                bottle.isBroken = true;
                AudioHub.playOne(AudioHub.BOTTLE_BREAK);
                setTimeout(() => {
                    const bottleIndex = this.throwableObject.indexOf(bottle);
                    this.throwableObject.splice(bottleIndex, 1);
                }, 200)
            }
        })
    }

    /**
     * Collects coins when the character collides with them.
     * - Plays sound effects.
     * - Increases coin percentage.
     * - Updates the coin bar and removes the collected coin.
     * @method
     */
    collectCoin() {
        this.level.collectibles.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                AudioHub.playOne(AudioHub.COIN_COLLECT);
                Coin.coinPercentage += 20;
                const coinIndex = this.level.collectibles.coins.indexOf(coin);
                this.level.collectibles.coins.splice(coinIndex, 1);
                this.coinbar.setPercentage(Coin.coinPercentage, Pix.status.coin);
            }
        })
    }

    /**
     * Collects bottles when the character collides with them.
     * - Plays sound effects.
     * - Increases bottle percentage.
     * - Updates the bottle bar and removes the collected bottle.
     * @method
     */
    collectBottle() {
        this.level.collectibles.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && Bottle.canBeStored()) {
                AudioHub.playOne(AudioHub.BOTTLE_COLLECT);
                Bottle.bottlePercentage += 20;
                const bottleIndex = this.level.collectibles.bottles.indexOf(bottle);
                this.level.collectibles.bottles.splice(bottleIndex, 1);
                this.bottlebar.setPercentage(Bottle.bottlePercentage, Pix.status.bottle);
            }
        })
    }

    /**
     * Main render loop for the game world.
     * - Clears the canvas.
     * - Draws movable and fixed objects.
     * - Translates the camera view.
     * - Uses requestAnimationFrame for continuous rendering.
     * @method
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addMovableObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addFixedObjects();
        // coordinate-system
        // this.setCoordinateSystem();
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds all movable objects to the map.
     * @method
     */
    addMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.collectibles.coins);
        this.addObjectsToMap(this.level.collectibles.bottles);
    }

    /**
     * Adds all fixed objects (UI elements such as health bar, coin bar, etc.) to the map.
     * @method
     */
    addFixedObjects() {
        this.addToMap(this.healthbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.coinbar);
        if (this.character.firstContactBoss) {
            this.addToMap(this.healthbarBoss);
        }
    }

    /**
     * Draws an object on the canvas, flipping it horizontally if necessary.
     * @param {Object} mO - The object to draw on the canvas.
     * @method
     */
    addToMap(mO) {
        if (mO.otherDirection) {
            this.flipImage(mO);
        }
        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height)
        if (mO.otherDirection) {
            this.flipImageBack(mO);
        }
    };

    /**
     * Draws a rectangle around a movable object for setting the hitbox.
     * @param {MovableObject} mO - The movable object to highlight.
     * @method
     */
    showRectangle(mO) {
        if (mO instanceof MovableObject) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(mO.rX, mO.rY, mO.rW, mO.rH);
            this.ctx.stroke();
        }
    }

    /**
     * Adds multiple objects to the map by iterating through the given array.
     * @param {Object[]} object - Array of objects to be drawn.
     * @method
     */
    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    };

    /**
     * Flips an object's image horizontally for rendering.
     * @param {Object} mO - The object to flip.
     * @method
     */
    flipImage(mO) {
        this.ctx.save();
        this.ctx.translate(mO.width, 0);
        this.ctx.scale(-1, 1);
        mO.x = mO.x * -1;
    }

    /**
     * Restores an object's position after being flipped horizontally.
     * @param {Object} mO - The object to restore.
     * @method
     */
    flipImageBack(mO) {
        mO.x = mO.x * -1;
        this.ctx.restore();
    }

    /**
     * Reset static values when game start
     * @method
     */
    resetValues() {
        Chicken.spawnX = 600;
        Bottle.bottlePercentage = 0;
    }
    // #endregion
}

