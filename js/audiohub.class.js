class MyAudio {
    sound;
    loaded = false;

    constructor(_sound) {
        this.sound = new Audio(_sound);
        this.sound.volume = 0.2;
    }
}


export class AudioHub {
    // Audiodateien 

    static CHR_DMG = new MyAudio('./sounds/character/characterDamage.mp3');
    static CHR_DEAD = new MyAudio('./sounds/character/characterDead.wav');
    static CHR_JUMP = new MyAudio('./sounds/character/characterJump.wav');
    static CHR_RUN = new MyAudio('./sounds/character/characterRun.mp3');
    static CHR_SNORING = new MyAudio('./sounds/character/characterSnoring.mp3');

    static CHCKN_DEAD = new MyAudio('./sounds/chicken/chickenDead.mp3');
    static MINICHCKN_DEAD = new MyAudio('./sounds/chicken/chickenDead2.mp3');
    static BOSS_APPR = new MyAudio('./sounds/endboss/endbossApproach.wav');

    static BOTTLE_COLLECT = new MyAudio('./sounds/collectibles/bottleCollectSound.wav');
    static COIN_COLLECT = new MyAudio('./sounds/collectibles/collectSound.wav');

    static GAME_START = new MyAudio('./sounds/game/gameStart.mp3');
    static GAME_MUSIC = new MyAudio('./sounds/game/game-music.mp3')
    static BOTTLE_BREAK = new MyAudio('./sounds/throwable/bottleBreak.mp3');
    static VICTORY = new MyAudio('./sounds/game/victory.mp3')




    // Array, das alle definierten Audio-Dateien enthält

    static allSounds = [AudioHub.BOSS_APPR, AudioHub.BOTTLE_BREAK, AudioHub.BOTTLE_COLLECT, AudioHub.CHCKN_DEAD, AudioHub.CHR_DEAD, AudioHub.CHR_DMG, AudioHub.CHR_RUN, AudioHub.CHR_JUMP, AudioHub.CHR_SNORING, AudioHub.COIN_COLLECT, AudioHub.GAME_START, AudioHub.MINICHCKN_DEAD, AudioHub.GAME_MUSIC, AudioHub.VICTORY];


    // Spielt eine einzelne Audiodatei ab
    static playOne(sound) {
        if (sound.sound.readyState == 4 || sound.loaded) {
            sound.sound.loaded = true;
            sound.sound.currentTime = 0; 
            sound.sound.play();  
        }

    }


    // Stoppt das Abspielen aller Audiodateien
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.sound.pause();  // Pausiert jedes Audio in der Liste
        });

    }


    // Stoppt das Abspielen einer einzelnen Audiodatei
    static stopOne(sound) {
        sound.sound.pause();  // Pausiert das übergebene Audio

    }
}
