namespace Snake3D {
  import ƒ = FudgeCore;

  class SnakeElement {
    elementNode: ƒ.Node = null;
    previousElement: SnakeElement = null;
    nextElement: SnakeElement = null;
    position: ƒ.Vector3 = null;
    newElement: boolean = true;

    public Move(): void {
      if (this.newElement) {
        this.newElement = false;
      } else {
        this.elementNode.cmpTransform.local.translation = this.previousElement.position;
      }

      if (this.nextElement != null) {
        this.nextElement.Move();
      }
    }
    public UpdatePosition(): void {
      this.position = this.elementNode.cmpTransform.local.translation;

      if (this.nextElement != null) {
        this.nextElement.UpdatePosition();
      }
    }
  }

  export class Snake {
    head: SnakeElement;
    //body: SnakeElement[] = [];

    constructor(position: ƒ.Vector3) {
      this.head = this.CreateNewElement();
      this.head.elementNode.mtxLocal.translation = position;
      this.head.position = position;
      this.head.newElement = false;
    }
    public Move(): void {
      this.head.elementNode.cmpTransform.local.translateY(1);

      if (this.head.nextElement != null) {
        this.head.nextElement.Move();
      }
    }
    public UpdatePosition(): void {
      this.head.position = this.head.elementNode.cmpTransform.local.translation;

      if (this.head.nextElement != null) {
        this.head.nextElement.UpdatePosition();
      }
    }
    public Rotate(rotation: ƒ.Vector3): void {
      this.head.elementNode.cmpTransform.local.rotate(rotation);
    }
    public AddSnakeElement(): SnakeElement {
      let lastElement: SnakeElement = this.GetLastElement(this.head);
      let newElement: SnakeElement = this.CreateNewElement();
      newElement.elementNode.cmpTransform.local.translation = lastElement.position;
      newElement.position = lastElement.position;
      lastElement.nextElement = newElement;
      newElement.previousElement = lastElement;
      return newElement;
    }
    public IsSnakeCollidingWhithItSelf(): boolean {
      return this.IsSnakeCollidingWith(this.head.position);
    }
    public IsSnakeCollidingWith(position: ƒ.Vector3): boolean {
      let endReached: boolean = false;
      let actualElement: SnakeElement = this.head.nextElement;

      while (!endReached) {
        if (actualElement.position == position) {
          return true;
        }
        if (actualElement.nextElement == null) {
          endReached = true;
        } else {
          actualElement = actualElement.nextElement;
        }
      }
      return false;
    }
    private CreateNewElement(): SnakeElement {
      let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
      let meshQuad: ƒ.MeshCube = new ƒ.MeshCube;

      let elementNode: ƒ.Node = new ƒ.Node("SnakeElement");
      elementNode.addComponent(new ƒ.ComponentTransform());
      elementNode.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
      elementNode.addComponent(new ƒ.ComponentMesh(meshQuad));
      //elementNode.cmpTransform.local.scale(new ƒ.Vector3(0.8, 0.8, 0.8));
      elementNode.getComponent(ƒ.ComponentMesh).pivot.scale(new ƒ.Vector3(0.8, 0.8, 0.8));

      let snakeElement: SnakeElement = new SnakeElement();
      snakeElement.elementNode = elementNode;
      return snakeElement;
    }
    private GetLastElement(element: SnakeElement): SnakeElement {
      if (element.nextElement != null) {
        return this.GetLastElement(element.nextElement);
      } else {
        return element;
      }
    }
  }
}