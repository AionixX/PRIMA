namespace Snake3D_Improved {
  export class EnemySnake extends Snake {
    constructor (_position: ƒ.Vector3, _graph: ƒ.Node) {
      super(_position, _graph);
    }
    protected CreateNewElement(): SnakeElement {
      let mtrSolidGrenn: ƒ.Material = new ƒ.Material("SolidGreen", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Green")));
      let meshQuad: ƒ.MeshCube = new ƒ.MeshCube;

      let elementNode: ƒ.Node = new ƒ.Node("SnakeElement");
      elementNode.addComponent(new ƒ.ComponentTransform());
      elementNode.addComponent(new ƒ.ComponentMaterial(mtrSolidGrenn));
      elementNode.addComponent(new ƒ.ComponentMesh(meshQuad));
      elementNode.getComponent(ƒ.ComponentMesh).pivot.scale(new ƒ.Vector3(0.8, 0.8, 0.8));
      this.graph.appendChild(elementNode);

      let snakeElement: SnakeElement = new SnakeElement();
      snakeElement.elementNode = elementNode;
      return snakeElement;
    }
  }
}