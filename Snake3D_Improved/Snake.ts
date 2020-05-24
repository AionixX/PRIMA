namespace Snake3D_Improved {

  export class Snake {
    head: SnakeElement;
    color: string;
    graph: ƒ.Node;

    constructor(_position: ƒ.Vector3, _graph: ƒ.Node, _color: string) {
      this.graph = _graph;
      this.color = _color;
      this.head = this.CreateNewElement();
      this.head.elementNode.mtxLocal.translation = _position;
      this.head.position = _position;
      this.head.newElement = false;
    }
    public Move(): void {

      if (this.IsOnEdge() == true) {
        this.Rotate(ƒ.Vector3.X(-90));
      }

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
    public Rotate(_rotation: ƒ.Vector3): void {
      this.head.elementNode.cmpTransform.local.rotate(_rotation);
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
    public IsSnakeCollidingWith(_position: ƒ.Vector3): boolean {
      let endReached: boolean = false;
      let actualElement: SnakeElement = this.head.nextElement;

      while (!endReached) {
        let result: ƒ.Vector3 = new ƒ.Vector3(actualElement.position.x - _position.x, actualElement.position.y - _position.y, actualElement.position.z - _position.z);
        if (result.magnitude < 1) {
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
    public CheckCollisionWithFood(_food: ƒ.Node[]): ƒ.Node[] {
      _food.forEach((element, i) => {
        if (this.IsSnakeOnPosition(element.mtxLocal.translation)) {
          this.AddSnakeElement();
          this.graph.removeChild(element);
          _food.splice(i, 1);
        }
      });
      return _food;
    }
    public CheckCollisionWithSnake(_snakeElement: SnakeElement): void {
      if (this.head.position.isInsideSphere(_snakeElement.position, 1)) {
        if (_snakeElement.previousElement) {
          _snakeElement.previousElement.nextElement = null;
          _snakeElement.previousElement = this.GetLastElement(this.head);
          this.ChangePosOfAll(_snakeElement, this.GetLastElement(this.head).position);
          this.GetLastElement(this.head).nextElement = _snakeElement;
        } else {
          if (_snakeElement.nextElement) {
            _snakeElement.nextElement.previousElement = this.GetLastElement(this.head);
            this.ChangePosOfAll(_snakeElement.nextElement, this.GetLastElement(this.head).position);
            this.GetLastElement(this.head).nextElement = _snakeElement.nextElement;
            _snakeElement.nextElement = null;
          }
        }
      }
      if (_snakeElement.nextElement) {
        this.CheckCollisionWithSnake(_snakeElement.nextElement);
      }
    }
    public IsSnakeOnPosition(_position: ƒ.Vector3): boolean {
      let result: ƒ.Vector3 = new ƒ.Vector3(this.head.position.x - _position.x, this.head.position.y - _position.y, this.head.position.z - _position.z);
      if (result.magnitude < 1)
        return true;
      return false;
    }
    public IsOnEdge(): boolean {
      let newTranslation: ƒ.Matrix4x4 = this.head.elementNode.cmpTransform.local.copy;
      newTranslation.translateY(1);
      let corner: ƒ.Vector3 = new ƒ.Vector3(data.gameFieldSize.x / 2, data.gameFieldSize.y / 2, data.gameFieldSize.z / 2);
      let oppCorner: ƒ.Vector3 = ƒ.Vector3.SCALE(corner, -1);
      corner.add(new ƒ.Vector3(1, 1, 1));
      return !newTranslation.translation.isInsideCube(corner, oppCorner);
    }
    public GetElementsCount(_element: SnakeElement): number {
      return _element.nextElement ? this.GetElementsCount(_element.nextElement) + 1 : 1;
    }
    protected CreateNewElement(): SnakeElement {
      let mtrFlat: ƒ.Material = new ƒ.Material("Flat", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS(this.color)));
      let meshQuad: ƒ.MeshCube = new ƒ.MeshCube;

      let elementNode: ƒ.Node = new ƒ.Node("SnakeElement");
      elementNode.addComponent(new ƒ.ComponentTransform());
      elementNode.addComponent(new ƒ.ComponentMaterial(mtrFlat));
      elementNode.addComponent(new ƒ.ComponentMesh(meshQuad));
      elementNode.getComponent(ƒ.ComponentMesh).pivot.scale(new ƒ.Vector3(0.8, 0.8, 0.8));
      this.graph.appendChild(elementNode);

      let snakeElement: SnakeElement = new SnakeElement();
      snakeElement.elementNode = elementNode;
      return snakeElement;
    }
    protected GetLastElement(_element: SnakeElement): SnakeElement {
      return _element.nextElement != null ? this.GetLastElement(_element.nextElement) : _element;
    }
    private ChangePosOfAll(_element: SnakeElement, _position: ƒ.Vector3): void {
      _element.elementNode.mtxLocal.translation = _position;
      _element.position = _position;
      _element.newElement = true;

      if (_element.nextElement)
        this.ChangePosOfAll(_element.nextElement, _position);
    }
  }
}