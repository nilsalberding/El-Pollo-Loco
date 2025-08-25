export class Keyboard {

    // #region attributes

    /**
    * flag, if button is pressed down
    * @type {boolean}
    */
    static UP = false;
    /**
    * flag, if button is pressed down
    * @type {boolean}
    */
    static DOWN = false;
    /**
    * flag, if button is pressed down
    * @type {boolean}
    */
    static LEFT = false;
    /**
    * flag, if button is pressed down
    * @type {boolean}
    */
    static RIGHT = false;
    /**
    * flag, if button is pressed down
    * @type {boolean}
    */
    static SPACE = false;
    /**
    * flag, if button is pressed down
    * @type {boolean}
    */
    static D = false;
    // #endregion

    /**
     * constructor set constrols 
     */
    constructor() {
        this.setControls();
        this.setMobileControls();
    }

    /**
     * set controls for Keyboard
     * @method
     */
    setControls() {
        window.addEventListener("keydown", (e) => {
            if (e.key == ' ') {
                Keyboard.SPACE = true;
            }
            if (e.key == 'ArrowLeft') {
                Keyboard.LEFT = true;
            }
            if (e.key == 'ArrowRight') {
                Keyboard.RIGHT = true;
            }
            if (e.key == 'ArrowDown') {
                Keyboard.DOWN = true;
            }
            if (e.key == 'ArrowUp') {
                Keyboard.UP = true;
            }
            if (e.key == 'd') {
                Keyboard.D = true;
            }
        })

        window.addEventListener("keyup", (e) => {
            if (e.key == ' ') {
                Keyboard.SPACE = false;
            }
            if (e.key == 'ArrowLeft') {
                Keyboard.LEFT = false;
            }
            if (e.key == 'ArrowRight') {
                Keyboard.RIGHT = false;
            }
            if (e.key == 'ArrowDown') {
                Keyboard.DOWN = false;
            }
            if (e.key == 'ArrowUp') {
                Keyboard.UP = false;
            }
            if (e.key == 'd') {
                Keyboard.D = false;
            }
        })
    }

    /**
     * set controls for mobile devices
     * @method
     */
    setMobileControls() {
        document.getElementById('btn-left').addEventListener('touchstart', () => {
            Keyboard.LEFT = true;
        });
        document.getElementById('btn-left').addEventListener('touchend', () => {
            Keyboard.LEFT = false;
        });
        document.getElementById('btn-right').addEventListener('touchstart', () => {
            Keyboard.RIGHT = true;
        });
        document.getElementById('btn-right').addEventListener('touchend', () => {
            Keyboard.RIGHT = false;
        });
        document.getElementById('btn-jump').addEventListener('touchstart', () => {
            Keyboard.SPACE = true;
        });
        document.getElementById('btn-jump').addEventListener('touchend', () => {
            Keyboard.SPACE = false;
        });
        document.getElementById('btn-throw').addEventListener('touchstart', () => {
            Keyboard.D = true;
        });
        document.getElementById('btn-throw').addEventListener('touchend', () => {
            Keyboard.D = false;
        });
    }
}

