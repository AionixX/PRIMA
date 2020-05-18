"use strict";
var Snake3D;
(function (Snake3D) {
    var ƒ = FudgeCore;
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
    class Snake {
        //body: SnakeElement[] = [];
        constructor(position) {
            this.head = this.CreateNewElement();
            this.head.elementNode.mtxLocal.translation = position;
            this.head.position = position;
            this.head.newElement = false;
        }
        Move() {
            this.head.elementNode.cmpTransform.local.translateY(1);
            if (this.head.nextElement != null) {
                this.head.nextElement.Move();
            }
        }
        UpdatePosition() {
            this.head.position = this.head.elementNode.cmpTransform.local.translation;
            if (this.head.nextElement != null) {
                this.head.nextElement.UpdatePosition();
            }
        }
        Rotate(rotation) {
            this.head.elementNode.cmpTransform.local.rotate(rotation);
        }
        AddSnakeElement() {
            let lastElement = this.GetLastElement(this.head);
            let newElement = this.CreateNewElement();
            newElement.elementNode.cmpTransform.local.translation = lastElement.position;
            newElement.position = lastElement.position;
            lastElement.nextElement = newElement;
            newElement.previousElement = lastElement;
            return newElement;
        }
        IsSnakeCollidingWhithItSelf() {
            return this.IsSnakeCollidingWith(this.head.position);
        }
        IsSnakeCollidingWith(position) {
            let endReached = false;
            let actualElement = this.head.nextElement;
            while (!endReached) {
                let result = new ƒ.Vector3(actualElement.position.x - position.x, actualElement.position.y - position.y, actualElement.position.z - position.z);
                if (result.magnitude < 1) {
                    return true;
                }
                if (actualElement.nextElement == null) {
                    endReached = true;
                }
                else {
                    actualElement = actualElement.nextElement;
                }
            }
            return false;
        }
        IsSnakeOnPosition(position) {
            let result = new ƒ.Vector3(this.head.position.x - position.x, this.head.position.y - position.y, this.head.position.z - position.z);
            if (result.magnitude < 1)
                return true;
            return false;
        }
        IsOnEdge() {
            if (this.IsOnTopFrontEdge())
                return true;
            if (this.IsOnTopLeftEdge())
                return true;
            if (this.IsOnTopBackEdge())
                return true;
            if (this.IsOnTopRightEdge())
                return true;
            if (this.IsOnBottomFrontEdge())
                return true;
            if (this.IsOnBottomLeftEdge())
                return true;
            if (this.IsOnBottomBackEdge())
                return true;
            if (this.IsOnBottomRightEdge())
                return true;
            if (this.IsOnFrontLeftEdge())
                return true;
            if (this.IsOnFrontRightEdge())
                return true;
            if (this.IsOnBackLeftEdge())
                return true;
            if (this.IsOnBackRightEdge())
                return true;
            return false;
        }
        IsOnTopFrontEdge() {
            if (this.head.position.y >= 10 && this.head.position.z >= 10) {
                console.log("IsOnTopFrontEdge");
                return true;
            }
            return false;
        }
        IsOnTopLeftEdge() {
            if (this.head.position.y >= 10 && this.head.position.x <= -11) {
                console.log("IsOnTopLeftEdge");
                return true;
            }
            return false;
        }
        IsOnTopBackEdge() {
            if (this.head.position.y >= 10 && this.head.position.z <= -11) {
                console.log("IsOnTopBackEdge");
                return true;
            }
            return false;
        }
        IsOnTopRightEdge() {
            if (this.head.position.y >= 10 && this.head.position.x >= 10) {
                console.log("IsOnTopRightEdge");
                return true;
            }
            return false;
        }
        IsOnBottomFrontEdge() {
            if (this.head.position.y <= -11 && this.head.position.z >= 10) {
                console.log("IsOnBottomFrontEdge");
                return true;
            }
            return false;
        }
        IsOnBottomLeftEdge() {
            if (this.head.position.y <= -11 && this.head.position.x <= -11) {
                console.log("IsOnBottomLeftEdge");
                return true;
            }
            return false;
        }
        IsOnBottomBackEdge() {
            if (this.head.position.y <= -11 && this.head.position.z <= -11) {
                console.log("IsOnBottomBackEdge");
                return true;
            }
            return false;
        }
        IsOnBottomRightEdge() {
            if (this.head.position.y <= -11 && this.head.position.x >= 10) {
                console.log("IsOnBottomRightEdge");
                return true;
            }
            return false;
        }
        IsOnFrontLeftEdge() {
            if (this.head.position.z >= 10 && this.head.position.x <= -11) {
                console.log("IsOnFrontLeftEdge");
                return true;
            }
            return false;
        }
        IsOnFrontRightEdge() {
            if (this.head.position.z >= 10 && this.head.position.x >= 10) {
                console.log("IsOnFrontRightEdge");
                return true;
            }
            return false;
        }
        IsOnBackLeftEdge() {
            if (this.head.position.z <= -11 && this.head.position.x <= -11) {
                console.log("IsOnBackLeftEdge");
                return true;
            }
            return false;
        }
        IsOnBackRightEdge() {
            if (this.head.position.z <= -11 && this.head.position.x >= 10) {
                console.log("IsOnBackRightEdge");
                return true;
            }
            return false;
        }
        CreateNewElement() {
            let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("White")));
            let meshQuad = new ƒ.MeshCube;
            let elementNode = new ƒ.Node("SnakeElement");
            elementNode.addComponent(new ƒ.ComponentTransform());
            elementNode.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
            elementNode.addComponent(new ƒ.ComponentMesh(meshQuad));
            //elementNode.cmpTransform.local.scale(new ƒ.Vector3(0.8, 0.8, 0.8));
            elementNode.getComponent(ƒ.ComponentMesh).pivot.scale(new ƒ.Vector3(0.8, 0.8, 0.8));
            let snakeElement = new SnakeElement();
            snakeElement.elementNode = elementNode;
            return snakeElement;
        }
        GetLastElement(element) {
            if (element.nextElement != null) {
                return this.GetLastElement(element.nextElement);
            }
            else {
                return element;
            }
        }
    }
    Snake3D.Snake = Snake;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Snake.js.map