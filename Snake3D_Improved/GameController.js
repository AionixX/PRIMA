"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    class GameController {
        constructor(_roundTime, _nEnemys, _graph, _viewport) {
            this.roundTime = _roundTime;
            this.timeLeft = this.roundTime;
            this.nEnemys = _nEnemys;
            this.controller = [];
            this.snakes = [];
            this.graph = _graph;
            this.viewport = _viewport;
            this.gamePaused = false;
            this.gameEnded = false;
            this.playerSnake = this.CreatePlayerSnake();
            this.snakes.push(this.playerSnake);
            this.food = this.CreateFoodArray();
            this.timeLeftSpan = document.querySelector("#timeLeft");
            for (let i = 1; i <= this.nEnemys; i++) {
                this.controller.push(this.CreateEnemyController(i));
            }
            this.controller.forEach(element => {
                this.snakes.push(element.GetSnake());
            });
            let time = new Snake3D_Improved.ƒ.Time();
            time.setTimer(1000, 0, () => {
                this.timeLeft--;
            });
        }
        EndGame() {
            this.gameEnded = true;
            let winner = "";
            let winnerCount = 0;
            this.snakes.forEach(snake => {
                if (snake.GetElementsCount(snake.head) > winnerCount) {
                    winner = snake.color;
                    winnerCount = snake.GetElementsCount(snake.head);
                }
            });
            let answer = window.confirm("Winner ist: " + winner + " with " + winnerCount + " elements. Want to play again?");
            if (answer) {
                window.location.reload();
            }
        }
        Update() {
            if (this.timeLeft <= 0) {
                this.EndGame();
                return;
            }
            this.timeLeftSpan.innerText = this.timeLeft.toString();
            this.playerSnake.Move();
            this.playerSnake.UpdatePosition();
            this.gameEnded = this.playerSnake.IsSnakeCollidingWhithItSelf();
            if (this.gameEnded)
                this.EndGame();
            this.CheckCollision();
            for (let _controller of this.controller) {
                _controller.EvaluateState(this.food);
                _controller.Update();
                this.food = _controller.CheckCollisionWithFood(this.food);
            }
            this.snakes.forEach(snake => {
                this.snakes.forEach(otherSnake => {
                    if (snake !== otherSnake) {
                        snake.CheckCollisionWithSnake(otherSnake.head);
                    }
                });
            });
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
            if (this.food.length < Snake3D_Improved.data.foodAmount) {
                let foodPiece = this.CreateFood();
                this.graph.appendChild(foodPiece);
                this.food.push(foodPiece);
            }
        }
        CreatePlayerSnake() {
            let snake = new Snake3D_Improved.Snake(new Snake3D_Improved.ƒ.Vector3(0, 0, (Snake3D_Improved.data.gameFieldSize.z / 2) + 1), this.graph, "White");
            return snake;
        }
        CreateEnemyController(_i) {
            let x = Math.ceil(_i / 2) + 1;
            let posX = _i % 2 == 0 ? x * Snake3D_Improved.data.startDistance : -x * Snake3D_Improved.data.startDistance;
            let enemySnake = new Snake3D_Improved.Snake(new Snake3D_Improved.ƒ.Vector3(posX, 0, (Snake3D_Improved.data.gameFieldSize.z / 2) + 1), this.graph, Snake3D_Improved.EnemyColor[_i - 1]);
            let enemyController = new Snake3D_Improved.EnemyController("EnemySnake", enemySnake, Snake3D_Improved.data.enemyDetectionRange);
            return enemyController;
        }
        CreateFoodArray() {
            let foodContainer = [];
            for (let i = 0; i < Snake3D_Improved.data.foodAmount; i++) {
                let food = this.CreateFood();
                this.graph.appendChild(food);
                foodContainer.push(food);
            }
            return foodContainer;
        }
        CreateFood() {
            let meshCube = new Snake3D_Improved.ƒ.MeshCube();
            let mtrSolidRed = new Snake3D_Improved.ƒ.Material("SolidRed", Snake3D_Improved.ƒ.ShaderFlat, new Snake3D_Improved.ƒ.CoatColored(Snake3D_Improved.ƒ.Color.CSS("Red")));
            let food = Snake3D_Improved.CreateNode("Food", meshCube, mtrSolidRed, this.GetRandomPosition(), Snake3D_Improved.ƒ.Vector3.ONE(0.8));
            return food;
        }
        GetRandomPosition() {
            let position = new Snake3D_Improved.ƒ.Vector3(Snake3D_Improved.ƒ.Random.default.getRangeFloored(-Snake3D_Improved.data.gameFieldSize.x / 2, Snake3D_Improved.data.gameFieldSize.x / 2), Snake3D_Improved.ƒ.Random.default.getRangeFloored(-Snake3D_Improved.data.gameFieldSize.y / 2, Snake3D_Improved.data.gameFieldSize.y / 2), Snake3D_Improved.ƒ.Random.default.getSign() * Snake3D_Improved.data.gameFieldSize.z / 2);
            /*let x: number = Math.floor((Math.random() * (data.gameFieldSize.x + 2)) - ((data.gameFieldSize.x + 2) / 2) + 1);
            let y: number = Math.floor((Math.random() * (data.gameFieldSize.y + 2)) - ((data.gameFieldSize.y + 2) / 2) + 1);
            let z: number = 11;
            let pos: ƒ.Vector3 = new ƒ.Vector3(x, y, z);*/
            return position;
        }
    }
    Snake3D_Improved.GameController = GameController;
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=GameController.js.map