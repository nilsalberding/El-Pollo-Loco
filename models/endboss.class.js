import { AudioHub } from "../js/audiohub.class.js";
import { toggleScreen } from "../js/game.js";
import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { HealthBarBoss } from "./healthbar_boss.class.js";
import { MovableObject } from "./movable_object.class.js";

/**
 * creates the endboss of the game
 * @class
 */
export class Endboss extends MovableObject {
    // #region attributes
    /**
     * x-coordinate
     * @type {number}
     */
    x = 3000;
    /**
     * y-coordinate
     * @type {number}
     */
    y = -200;
    /**
     * height of images
     * @type {number}
     */
    height = 250;
    /**
     * health of boss
     * @type {number}
     */
    health = 100;
    /**
     * moving speed
     * @type {number}
     */
    speedX = 5;
    /**
    * Collision offset values to adjust hitbox.
    * @type {{top:number,left:number,right:number,bottom:number}}
    */
    offset = {
        top: 80,
        left: 40,
        right: 30,
        bottom: 10
    }
    /**
     * flag, if sound of death played once
     * @type {boolean}
     */
    deadSoundPlayed = false;
    /**
     * Counter, which is for playing attack animation
     * @static
     * @type {boolean}
     */
    static ATTACK_COUNTER = 0;
// #endregion
/**
 * constructor loads images, start the intervals and set width
 */
    constructor() {
        super().loadImage(Pix.boss.alert[0]);
        this.loadBossImages();
        this.startBossIntervals();
        this.width = this.height * 0.86;
    }

    // #region methods
    /**
     * set animations of the boss
     * @method
     */
    animate = () => {
        if (this.currentImage < Pix.boss.alert.length) {
            this.playAnimation(Pix.boss.alert)
        } else if (this.isDead()) {
            this.playAnimation(Pix.boss.dead);
        } else if (this.isHurt) {
            this.playAnimation(Pix.boss.hurt);
        } else if (this.attackReady()) {
            this.playAnimation(Pix.boss.attack);
        } else {
            this.playAnimation(Pix.boss.walk);
            this.moveLeft();
        }
    }

    /**
     * returns, if the boss can attack. boss should attack every six seconds
     * @returns {boolean} - returns, if attack is ready
     * @method
     */
    attackReady() {
        return Endboss.ATTACK_COUNTER % 3 == 0;
    }

    /**
     * attack animation of boss. Attack counter goes one up every two seconds. 
     * @method
     */
    attack = () => {
        Endboss.ATTACK_COUNTER++
        if (this.attackReady()) {
            setTimeout(() => {
                this.x -= 130;
                setTimeout(() => {
                    this.x += 70;
                }, 200);
            }, 1000);
        }
    }

    /**
     * update the healthbar of boss
     * @method
     */
    setHealthbar = () => {
        HealthBarBoss.BossHealth = this.health;
    }

    /**
     * checks, if bosshealth is 0. Set the winnerscreen and stop all Intervals of the game.
     * @method
     */
    checkDead = () => {
        if (this.isDead() && !this.deadSoundPlayed) {
            this.playBossDeadSound();
            setTimeout(() => {
                toggleScreen('winner-screen')
                IntervalHub.stopAllIntervals();
                AudioHub.stopAll();
                AudioHub.playOne(AudioHub.VICTORY);
                toggleScreen('mobile-btns');
            }, 500)
        }
    }

    /**
     * plays the deadsound of boss and set the flag on true.
     * @method
     */
    playBossDeadSound() {
        AudioHub.playOne(AudioHub.CHCKN_DEAD)
        this.deadSoundPlayed = true;
    }

    /**
     * load all boss images
     * @method
     */
    loadBossImages() {
        this.loadImages(Pix.boss.alert);
        this.loadImages(Pix.boss.dead);
        this.loadImages(Pix.boss.attack);
        this.loadImages(Pix.boss.hurt);
        this.loadImages(Pix.boss.walk);
    }

    /**
     * start all Interval-functions
     * @method
     */
    startBossIntervals() {
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.attack, 1000 / 0.5);
        IntervalHub.startInterval(this.setHealthbar, 1000 / 10);
        IntervalHub.startInterval(this.animate, 1000 / 10);
        IntervalHub.startInterval(this.applyGravity, 100 / 3);
        IntervalHub.startInterval(this.checkDead, 1000 / 1);
    }
    // #endregion
}