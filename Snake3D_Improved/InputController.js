"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    class PlayerController extends Snake3D_Improved.Controller {
        Init() {
            document.addEventListener("keydown", this.HandleInput);
        }
        HandleInput() {
        }
    }
    Snake3D_Improved.PlayerController = PlayerController;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=InputController.js.map