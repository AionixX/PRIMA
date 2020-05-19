"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
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
            //TODO 
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
            let snakeElement = new Snake3D_Improved.SnakeElement();
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
    Snake3D_Improved.Snake = Snake;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=Snake.js.map