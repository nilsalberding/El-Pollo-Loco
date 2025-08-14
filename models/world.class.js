import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Bottle } from "./bottle.class.js";
import { Coin } from "./coin.class.js";
import { Collectibles } from "./collectibles.class.js";
import { Endboss } from "./endboss.class.js";

import { Level } from "./level.class.js";
import { Statusbar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable_object.class.js";



export class World {

    // #region attributes

    character = new Character();
    healthbar = new Statusbar(Pix.status.health, 0);
    bottlebar = new Statusbar(Pix.status.bottle, 40);
    coinbar = new Statusbar(Pix.status.coin, 80);
    throwableObject = [];
    level = new Level();
    canvas;
    ctx;
    camera_x = 0;

    // #endregion

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.checkCollisions, 1000 / 60);
    }

    // #region methods

    setWorld() {
        this.character.world = this;
    }



    checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            // Collision Character jump on Enemy
            if (this.character.isColliding(enemy) && this.character.isFalling) {
                this.character.jumpOnEnemy();
                enemy.hit();

            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthbar.setPercentage(this.character.health, Pix.status.health);
            }

            // Flasche trifft Gegner
            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    enemy.hit();
                    bottle.isBroken = true;
                    setTimeout(() => {
                        this.throwableObject.splice(bottle, 1);
                    },200)
                }
            })

            // Coins einsammeln
            this.level.collectibles.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    Coin.coinCounter++;
                    const coinIndex = this.level.collectibles.coins.indexOf(coin);
                    this.level.collectibles.coins.splice(coinIndex, 1);
                }
            })

            //  Flaschen einsammeln
            this.level.collectibles.bottles.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    Bottle.bottleCounter++;
                    const bottleIndex = this.level.collectibles.bottles.indexOf(bottle);
                    this.level.collectibles.bottles.splice(bottleIndex, 1);
                }
            })
        })



    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addMovableObjects();

        this.ctx.translate(-this.camera_x, 0);

        // #region for fixed Objects
        this.addFixedObjects();
        // #endregion

        // Koordinatensystem
        // this.setCoordinateSystem();

        requestAnimationFrame(() => this.draw());
    }

    addMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectibles.coins);
        this.addObjectsToMap(this.level.collectibles.bottles);
    }

    addFixedObjects() {
        this.addToMap(this.healthbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.coinbar);
    }

    addToMap(mO) {
        if (mO.otherDirection) {
            this.flipImage(mO);
        }

        this.showRectangle(mO);

        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height)
        if (mO.otherDirection) {
            this.flipImageBack(mO);
        }
    };

    showRectangle(mO) {
        if (mO instanceof Character || mO instanceof Chicken || mO instanceof Endboss || mO instanceof Collectibles) {
            this.ctx.beginPath();
            this.ctx.lineWidth = '3';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(mO.rX, mO.rY, mO.rW, mO.rH);
            this.ctx.stroke();
        }
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        })
    };

    // flipImage(mO) {
    //     this.ctx.save();
    //     this.ctx.translate(mO.rW, 0);
    //     this.ctx.scale(-1, 1);
    //     mO.rX = mO.rX * -1;
    // }

    flipImage(mO) {
        this.ctx.save();
        this.ctx.translate(mO.width, 0);
        this.ctx.scale(-1, 1);
        mO.x = mO.x * -1;
    }

    // flipImageBack(mO) {
    //     this.ctx.restore();
    //     mO.rX = mO.rX * -1;
    // }

    flipImageBack(mO) {

        mO.x = mO.x * -1;
        this.ctx.restore();
    }

    setCoordinateSystem() {
        const gridColor = '#ffffffff';
        const gridWidth = 0.5;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Funktion zum Zeichnen des Rasters

        // Setze die Linienstärke und -farbe
        this.ctx.lineWidth = gridWidth;
        this.ctx.strokeStyle = gridColor;

        // Zeichne vertikale Linien
        for (let x = 0; x <= canvasWidth; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, canvasHeight);
            this.ctx.stroke();
        }

        // Zeichne horizontale Linien
        for (let y = 0; y <= canvasHeight; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(canvasWidth, y);
            this.ctx.stroke();
        }
    }

    // #endregion
}

