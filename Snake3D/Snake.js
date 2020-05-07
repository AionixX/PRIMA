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
                if (actualElement.position == position) {
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
        CreateNewElement() {
            let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
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