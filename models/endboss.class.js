import { AudioHub } from "../js/audiohub.class.js";
import { toggleScreen } from "../js/game.js";
import { IntervalHub } from "../js/intervall_hub.class.js";
import { Pix } from "../js/pix.class.js";
import { HealthBarBoss } from "./healthbar_boss.class.js";
import { MovableObject } from "./movable_object.class.js";

export class Endboss extends MovableObject {

    x = 3000;
    y = -200;
    height = 250;
    health = 100;
    speedX = 5;


    offset = {
        top: 80,
        left: 40,
        right: 30,
        bottom: 10
    }

    static ATTACK_COUNTER = 0;

    deadSoundPlayed = false;



    constructor() {
        super().loadImage(Pix.boss.alert[0]);
        this.loadImages(Pix.boss.alert);
        this.loadImages(Pix.boss.dead);
        this.loadImages(Pix.boss.attack);
        this.loadImages(Pix.boss.hurt);
        this.loadImages(Pix.boss.walk);
        this.width = this.height * 0.86;
        IntervalHub.startInterval(this.getRealFrame, 1000 / 60);
        IntervalHub.startInterval(this.attack, 1000 / 0.5);
        IntervalHub.startInterval(this.setHealthbar, 1000 / 10);
        IntervalHub.startInterval(this.animate, 1000 / 5);
        IntervalHub.startInterval(this.applyGravity, 100 / 3);
        IntervalHub.startInterval(this.checkDead, 1000 / 1);
    }

    // #region methods

    animate = () => {

        if (this.currentImage < Pix.boss.alert.length) {
            this.playAnimation(Pix.boss.alert)
        }
        else if (this.isDead()) {
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

    attackReady() {
        return Endboss.ATTACK_COUNTER % 3 == 0;
    }

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

    setHealthbar = () => {
        HealthBarBoss.BossHealth = this.health;
    }

    checkDead = () => {
        if (this.isDead() && !this.deadSoundPlayed) {

            this.playBossDeadSound();
            setTimeout(() => {

                this.showWinnerScreen();
                IntervalHub.stopAllIntervals();
                AudioHub.stopAll();
                AudioHub.playOne(AudioHub.VICTORY);
                toggleScreen('mobile-btns');
            }, 500)
        }
    }

    showWinnerScreen() {
        const endscreen = document.getElementById('winner-screen');
        endscreen.classList.remove('d-none');
        endscreen.classList.add('d-flex');
    }

    playBossDeadSound() {
        AudioHub.playOne(AudioHub.CHCKN_DEAD)
        this.deadSoundPlayed = true;
    }

    // #endregion
}