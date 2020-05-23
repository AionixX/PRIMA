"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    class EnemyController extends Snake3D_Improved.Controller {
        constructor(_name, _snake, _detectionRange) {
            super(_name, _snake);
            this.detectionRange = 4;
            this.detectionRange = _detectionRange;
            this.target = null;
            this.state = Snake3D_Improved.EnemyState.IDLE;
            this.snake.AddSnakeElement();
            this.snake.AddSnakeElement();
            this.snake.AddSnakeElement();
            this.snake.AddSnakeElement();
        }
        Update() {
            switch (this.state) {
                case Snake3D_Improved.EnemyState.HUNT_FOR_FOOD:
                    console.log("here");
                    this.CheckDirection();
                    break;
            }
            this.snake.Move();
            this.snake.UpdatePosition();
        }
        EvaluateState(_food) {
            if (this.target != null) {
                if (this.target.mtxLocal.translation.isInsideSphere(this.snake.head.position, this.detectionRange)) {
                    return;
                }
                else {
                    this.target = null;
                    this.state = Snake3D_Improved.EnemyState.IDLE;
                }
            }
            _food.forEach(element => {
                if (element.mtxLocal.translation.isInsideSphere(this.snake.head.position, this.detectionRange)) {
                    this.target = element;
                    this.state = Snake3D_Improved.EnemyState.HUNT_FOR_FOOD;
                    return;
                }
            });
        }
        CheckCollisionWithFood(_food) {
            let size = _food.length;
            _food = this.snake.CheckCollisionWithFood(_food);
            if (size > _food.length) {
                this.target = null;
                this.state = Snake3D_Improved.EnemyState.IDLE;
            }
            return _food;
        }
        CheckDirection() {
            let targetTrans = this.target.cmpTransform.local.translation;
            let newTransLeft = this.snake.head.elementNode.cmpTransform.local.copy;
            newTransLeft.rotate(Snake3D_Improved.ƒ.Vector3.Z(90));
            newTransLeft.translateY(1);
            let firstMag = new Snake3D_Improved.ƒ.Vector3(targetTrans.x - newTransLeft.translation.x, targetTrans.y - newTransLeft.translation.y, targetTrans.z - newTransLeft.translation.z).magnitude;
            let newTransUp = this.snake.head.elementNode.cmpTransform.local.copy;
            newTransUp.translateY(1);
            let secondMag = new Snake3D_Improved.ƒ.Vector3(targetTrans.x - newTransUp.translation.x, targetTrans.y - newTransUp.translation.y, targetTrans.z - newTransUp.translation.z).magnitude;
            let newTransRight = this.snake.head.elementNode.cmpTransform.local.copy;
            newTransRight.rotate(Snake3D_Improved.ƒ.Vector3.Z(-90));
            newTransRight.translateY(1);
            let thirdMag = new Snake3D_Improved.ƒ.Vector3(targetTrans.x - newTransRight.translation.x, targetTrans.y - newTransRight.translation.y, targetTrans.z - newTransRight.translation.z).magnitude;
            if (firstMag < secondMag && firstMag < thirdMag)
                this.snake.Rotate(Snake3D_Improved.ƒ.Vector3.Z(90));
            if (thirdMag < secondMag && thirdMag < firstMag)
                this.snake.Rotate(Snake3D_Improved.ƒ.Vector3.Z(-90));
        }
    }
    Snake3D_Improved.EnemyController = EnemyController;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=EnemyController.js.map