namespace Snake3D_Improved {

  export class EnemyController extends Controller {
    private detectionRange: number = 4;
    private target: ƒ.Node;
    private state: EnemyState;

    constructor(_name: string, _snake: Snake, _detectionRange: number) {
      super(_name, _snake);
      this.detectionRange = _detectionRange;
      this.target = null;
      this.state = EnemyState.IDLE;

      this.snake.AddSnakeElement();
      this.snake.AddSnakeElement();
      this.snake.AddSnakeElement();
      this.snake.AddSnakeElement();
    }
    public Update(): void {
      switch (this.state) {
        case EnemyState.HUNT_FOR_FOOD:
          console.log("here");
          this.CheckDirection();
          break;
      }
      this.snake.Move();
      this.snake.UpdatePosition();
    }
    public EvaluateState(_food: ƒ.Node[]): void {
      if (this.target != null) {
        if (this.target.mtxLocal.translation.isInsideSphere(this.snake.head.position, this.detectionRange)) {
          return;
        } else {
          this.target = null;
          this.state = EnemyState.IDLE;
        }
      }
      _food.forEach(element => {
        if (element.mtxLocal.translation.isInsideSphere(this.snake.head.position, this.detectionRange)) {
          this.target = element;
          this.state = EnemyState.HUNT_FOR_FOOD;
          return;
        }
      });
    }
    public CheckCollisionWithFood(_food: ƒ.Node[]): ƒ.Node[] {
      let size: number = _food.length;
      _food = this.snake.CheckCollisionWithFood(_food);
      
      if (size > _food.length) {
        this.target = null;
        this.state = EnemyState.IDLE;
      }
      return _food;
    }
    private CheckDirection(): void {
      let targetTrans: ƒ.Vector3 = this.target.cmpTransform.local.translation;

      let newTransLeft: ƒ.Matrix4x4 = this.snake.head.elementNode.cmpTransform.local.copy;
      newTransLeft.rotate(ƒ.Vector3.Z(90));
      newTransLeft.translateY(1);

      let firstMag: number = new ƒ.Vector3(targetTrans.x - newTransLeft.translation.x, targetTrans.y - newTransLeft.translation.y, targetTrans.z - newTransLeft.translation.z).magnitude;

      let newTransUp: ƒ.Matrix4x4 = this.snake.head.elementNode.cmpTransform.local.copy;
      newTransUp.translateY(1);

      let secondMag: number = new ƒ.Vector3(targetTrans.x - newTransUp.translation.x, targetTrans.y - newTransUp.translation.y, targetTrans.z - newTransUp.translation.z).magnitude;
      
      let newTransRight: ƒ.Matrix4x4 = this.snake.head.elementNode.cmpTransform.local.copy;
      newTransRight.rotate(ƒ.Vector3.Z(-90));
      newTransRight.translateY(1);

      let thirdMag: number = new ƒ.Vector3(targetTrans.x - newTransRight.translation.x, targetTrans.y - newTransRight.translation.y, targetTrans.z - newTransRight.translation.z).magnitude;

      if (firstMag < secondMag && firstMag < thirdMag)
        this.snake.Rotate(ƒ.Vector3.Z(90));

      if (thirdMag < secondMag && thirdMag < firstMag)
        this.snake.Rotate(ƒ.Vector3.Z(-90));

    }
  }
}
