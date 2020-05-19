"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    class SnakeElement {
        constructor() {
            this.elementNode = null;
            this.previousElement = null;
            this.nextElement = null;
            this.position = null;
            this.newElement = true;
        }
        Move() {
            if (this.newElement) {
                this.newElement = false;
            }
            else {
                this.elementNode.cmpTransform.local.translation = this.previousElement.position;
            }
            if (this.nextElement != null) {
                this.nextElement.Move();
            }
        }
        UpdatePosition() {
            this.position = this.elementNode.cmpTransform.local.translation;
            if (this.nextElement != null) {
                this.nextElement.UpdatePosition();
            }
        }
    }
    Snake3D_Improved.SnakeElement = SnakeElement;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=SnakeElement.js.map