"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    class GameController {
        constructor(_roundTime, _nEnemys, _graph, _viewport) {
            this.roundTime = _roundTime;
            this.timeLeft = this.roundTime;
            this.nEnemys = _nEnemys;
            this.controller = [];
            this.graph = _graph;
            this.viewport = _viewport;
            this.gamePaused = false;
            this.gameEnded = false;
            this.playerSnake = this.CreatePlayerSnake();
            this.food = this.CreateFood();
            for (let i = 0; i < this.nEnemys; i++) {
                this.controller.push(this.CreateEnemyController());
            }
        }
        Update() {
            this.playerSnake.Move();
            this.playerSnake.UpdatePosition();
            this.gameEnded = this.playerSnake.IsSnakeCollidingWhithItSelf();
            this.CheckCollision();
            for (let _controller of this.controller) {
                _controller.EvaluateState(this.food);
                _controller.Update();
                this.food = _controller.CheckCollisionWithFood(this.food);
            }
            this.MoveCamera();
        }
        TurnPlayerSnakeLeft() {
            this.playerSnake.Rotate(Snake3D_Improved.ƒ.Vector3.Z(90));
        }
        TurnPlayerSnakeRight() {
            this.playerSnake.Rotate(Snake3D_Improved.ƒ.Vector3.Z(-90));
        }
        AddElementToPlayerSnake() {
            this.playerSnake.AddSnakeElement();
        }
        MoveCamera() {
            let mtxHead = this.playerSnake.head.elementNode.mtxLocal;
            let posCamera = mtxHead.translation;
            posCamera.normalize(Snake3D_Improved.data.gameFieldSize.magnitude * 1.5);
            this.viewport.camera.pivot.translation = posCamera;
            let up = Snake3D_Improved.ƒ.Vector3.X();
            up.transform(mtxHead, false);
            try {
                this.viewport.camera.pivot.lookAt(Snake3D_Improved.ƒ.Vector3.ZERO());
            }
            catch {
                console.log("cant normalize");
            }
        }
        PauseGame() {
            this.gamePaused = !this.gamePaused;
        }
        IsGamePaused() {
            return this.gamePaused;
        }
        IsGameEnded() {
            return this.gameEnded;
        }
        CheckCollision() {
            this.food = this.playerSnake.CheckCollisionWithFood(this.food);
        }
        CreatePlayerSnake() {
            let snake = new Snake3D_Improved.Snake(new Snake3D_Improved.ƒ.Vector3(0, 0, (Snake3D_Improved.data.gameFieldSize.z / 2) + 1), this.graph);
            return snake;
        }
        CreateEnemyController() {
            let enemySnake = new Snake3D_Improved.EnemySnake(this.GetRandomPosition(), this.graph);
            let enemyController = new Snake3D_Improved.EnemyController("EnemySnake", enemySnake, Snake3D_Improved.data.enemyDetectionRange);
            return enemyController;
        }
        CreateFood() {
            let foodContainer = [];
            let meshCube = new Snake3D_Improved.ƒ.MeshCube();
            let mtrSolidRed = new Snake3D_Improved.ƒ.Material("SolidRed", Snake3D_Improved.ƒ.ShaderFlat, new Snake3D_Improved.ƒ.CoatColored(Snake3D_Improved.ƒ.Color.CSS("Red")));
            for (let i = 0; i < Snake3D_Improved.data.foodAmount; i++) {
                let food = Snake3D_Improved.CreateNode("Food", meshCube, mtrSolidRed, this.GetRandomPosition(), Snake3D_Improved.ƒ.Vector3.ONE(0.8));
                foodContainer.push(food);
                this.graph.appendChild(food);
            }
            return foodContainer;
        }
        GetRandomPosition() {
            let x = Math.floor((Math.random() * Snake3D_Improved.data.gameFieldSize.x + 3) - ((Snake3D_Improved.data.gameFieldSize.x + 2) / 2));
            let y = Math.floor((Math.random() * Snake3D_Improved.data.gameFieldSize.y + 3) - ((Snake3D_Improved.data.gameFieldSize.y + 2) / 2));
            let z = 11;
            let pos = new Snake3D_Improved.ƒ.Vector3(x, y, z);
            return pos;
        }
    }
    Snake3D_Improved.GameController = GameController;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=GameController.js.map