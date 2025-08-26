/**
 * Wrapper class for an audio file.
 * Provides a standardized way to create and manage sound objects.
 */
class MyAudio {
    /**
     * The HTMLAudioElement instance.
     * @type {HTMLAudioElement}
     */
    sound;

    /**
     * Indicates if the audio file has been loaded.
     * @type {boolean}
     */
    loaded = false;

    /**
     * Creates a new audio object.
     *
     * @param {string} _sound - Path or URL to the audio file.
     */
    constructor(_sound) {
        this.sound = new Audio(_sound);
        this.sound.volume = 0.2;
    }
}

/**
 * Centralized audio manager for all game sounds.
 * Provides static references to all sound effects and music,
 * as well as utility methods for playing and stopping audio.
 */
export class AudioHub {
    // Character sounds
    static CHR_DMG = new MyAudio('./sounds/character/characterDamage.mp3');
    static CHR_DEAD = new MyAudio('./sounds/character/characterDead.wav');
    static CHR_JUMP = new MyAudio('./sounds/character/characterJump.wav');
    static CHR_RUN = new MyAudio('./sounds/character/characterRun.mp3');
    static CHR_SNORING = new MyAudio('./sounds/character/characterSnoring.mp3');

    // Enemy sounds
    static CHCKN_DEAD = new MyAudio('./sounds/chicken/chickenDead.mp3');
    static MINICHCKN_DEAD = new MyAudio('./sounds/chicken/chickenDead2.mp3');
    static BOSS_APPR = new MyAudio('./sounds/endboss/endbossApproach.wav');

    // Collectible sounds
    static BOTTLE_COLLECT = new MyAudio('./sounds/collectibles/bottleCollectSound.wav');
    static COIN_COLLECT = new MyAudio('./sounds/collectibles/collectSound.wav');

    // Game sounds
    static GAME_START = new MyAudio('./sounds/game/gameStart.mp3');
    static GAME_MUSIC = new MyAudio('./sounds/game/game-music.mp3');
    static BOTTLE_BREAK = new MyAudio('./sounds/throwable/bottleBreak.mp3');
    static VICTORY = new MyAudio('./sounds/game/victory.mp3');

    /**
     * Array containing all available sound objects.
     * @type {MyAudio[]}
     */
    static allSounds = [
        AudioHub.BOSS_APPR,
        AudioHub.BOTTLE_BREAK,
        AudioHub.BOTTLE_COLLECT,
        AudioHub.CHCKN_DEAD,
        AudioHub.CHR_DEAD,
        AudioHub.CHR_DMG,
        AudioHub.CHR_RUN,
        AudioHub.CHR_JUMP,
        AudioHub.CHR_SNORING,
        AudioHub.COIN_COLLECT,
        AudioHub.GAME_START,
        AudioHub.MINICHCKN_DEAD,
        AudioHub.GAME_MUSIC,
        AudioHub.VICTORY
    ];

    /**
     * Plays a single audio file from the beginning.
     *
     * @param {MyAudio} sound - The sound object to play.
     */
    static playOne(sound) {
        if (sound.sound.readyState == 4 || sound.loaded) {
            sound.sound.loaded = true;
            sound.sound.currentTime = 0;
            sound.sound.play();
        }
    }

    /**
     * Stops playback of all defined audio files.
     */
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.sound.pause();
        });
    }

    /**
     * Stops playback of a single audio file.
     *
     * @param {MyAudio} sound - The sound object to stop.
     */
    static stopOne(sound) {
        sound.sound.pause();
    }
}