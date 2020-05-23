"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    class Controller {
        constructor(_name, _snake) {
            this.name = _name;
            this.snake = _snake;
        }
        GetSnake() {
            return this.snake;
        }
    }
    Snake3D_Improved.Controller = Controller;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=Controller.js.map