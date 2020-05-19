namespace Snake3D_Improved {
  export class SnakeElement {
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
}