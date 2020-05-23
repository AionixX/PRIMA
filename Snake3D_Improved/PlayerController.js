"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    class PlayerController extends Snake3D_Improved.Controller {
        constructor(_name, _snake) {
            super(_name, _snake);
            this.gameEnded = false;
            this.gamePaused = false;
            document.addEventListener("keydown", this.HandleInput);
        }
        Update() {
            console.log("Hello");
            this.snake.Move();
        }
        HandleInput(_event) {
            let self = this;
            console.log("event");
            switch (_event.code) {
                case Snake3D_Improved.ƒ.KEYBOARD_CODE.SPACE:
                    console.log(this.gamePaused);
                    self.PauseGame();
                    console.log(this.gamePaused);
                    console.log("______________");
                    break;
                case Snake3D_Improved.ƒ.KEYBOARD_CODE.A:
                    this.snake.Rotate(Snake3D_Improved.ƒ.Vector3.Z(90));
                    break;
            }
        }
        PauseGame() {
            this.gamePaused = !this.gamePaused;
        }
        IsGamePaused() {
            return this.gamePaused;
        }
        IsGameEnded() {
            return this.gameEnded;
        }
    }
    Snake3D_Improved.PlayerController = PlayerController;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=PlayerController.js.map