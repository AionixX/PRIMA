"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    class EnemySnake extends Snake3D_Improved.Snake {
        constructor(_position, _graph) {
            super(_position, _graph);
        }
        CreateNewElement() {
            let mtrSolidGrenn = new Snake3D_Improved.ƒ.Material("SolidGreen", Snake3D_Improved.ƒ.ShaderFlat, new Snake3D_Improved.ƒ.CoatColored(Snake3D_Improved.ƒ.Color.CSS("Green")));
            let meshQuad = new Snake3D_Improved.ƒ.MeshCube;
            let elementNode = new Snake3D_Improved.ƒ.Node("SnakeElement");
            elementNode.addComponent(new Snake3D_Improved.ƒ.ComponentTransform());
            elementNode.addComponent(new Snake3D_Improved.ƒ.ComponentMaterial(mtrSolidGrenn));
            elementNode.addComponent(new Snake3D_Improved.ƒ.ComponentMesh(meshQuad));
            elementNode.getComponent(Snake3D_Improved.ƒ.ComponentMesh).pivot.scale(new Snake3D_Improved.ƒ.Vector3(0.8, 0.8, 0.8));
            this.graph.appendChild(elementNode);
            let snakeElement = new Snake3D_Improved.SnakeElement();
            snakeElement.elementNode = elementNode;
            return snakeElement;
        }
    }
    Snake3D_Improved.EnemySnake = EnemySnake;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=EnemySnake.js.map