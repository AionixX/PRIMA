namespace Snake3D_Improved {

  export class GameController {
    roundTime: number;
    nEnemys: number;
    controller: EnemyController[];
    snakes: Snake[];
    playerSnake: Snake;
    timeLeft: number;
    graph: ƒ.Node;
    food: ƒ.Node[];
    viewport: ƒ.Viewport;
    gamePaused: boolean;
    gameEnded: boolean;
    timeLeftSpan: HTMLSpanElement;

    constructor(_roundTime: number, _nEnemys: number, _graph: ƒ.Node, _viewport: ƒ.Viewport) {
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

      for (let i: number = 1; i <= this.nEnemys; i++) {
        this.controller.push(this.CreateEnemyController(i));
      }
      this.controller.forEach(element => {
        this.snakes.push(element.GetSnake());
      });

      let time: ƒ.Time = new ƒ.Time();
      time.setTimer(1000, 0, () => {
        this.timeLeft--;
      });
    }
    public EndGame(): void {
      this.gameEnded = true;
      let winner: string = "";
      let winnerCount: number = 0;
      this.snakes.forEach(snake => {
        if (snake.GetElementsCount(snake.head) > winnerCount) {
          winner = snake.color;
          winnerCount = snake.GetElementsCount(snake.head);
        }
      });
      let answer: boolean = window.confirm("Winner ist: " + winner + " with " + winnerCount + " elements. Want to play again?");
      if (answer) {
        window.location.reload();
      }
    }
    public Update(): void {
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

    public TurnPlayerSnakeLeft(): void {
      this.playerSnake.Rotate(ƒ.Vector3.Z(90));
    }
    public TurnPlayerSnakeRight(): void {
      this.playerSnake.Rotate(ƒ.Vector3.Z(-90));
    }
    public AddElementToPlayerSnake(): void {
      this.playerSnake.AddSnakeElement();
    }
    public MoveCamera(): void {
      let mtxHead: ƒ.Matrix4x4 = this.playerSnake.head.elementNode.mtxLocal;
      let posCamera: ƒ.Vector3 = mtxHead.translation;
      posCamera.normalize(data.gameFieldSize.magnitude * 1.5);
      this.viewport.camera.pivot.translation = posCamera;
      let up: ƒ.Vector3 = ƒ.Vector3.X();
      up.transform(mtxHead, false);
      try {
        this.viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO());
      } catch {
        console.log("cant normalize");
      }
    }
    public PauseGame(): void {
      this.gamePaused = !this.gamePaused;
    }
    public IsGamePaused(): boolean {
      return this.gamePaused;
    }
    public IsGameEnded(): boolean {
      return this.gameEnded;
    }
    private CheckCollision(): void {
      this.food = this.playerSnake.CheckCollisionWithFood(this.food);

      if (this.food.length < data.foodAmount) {
        let foodPiece: ƒ.Node = this.CreateFood();
        this.graph.appendChild(foodPiece);
        this.food.push(foodPiece);
      }
    }
    private CreatePlayerSnake(): Snake {
      let snake: Snake = new Snake(new ƒ.Vector3(0, 0, (data.gameFieldSize.z / 2) + 1), this.graph, "White");
      return snake;
    }
    private CreateEnemyController(_i: number): EnemyController {
      let x: number = Math.ceil(_i / 2) + 1;
      let posX: number = _i % 2 == 0 ? x * data.startDistance : -x * data.startDistance;
      let enemySnake: Snake = new Snake(new ƒ.Vector3(posX, 0, (data.gameFieldSize.z / 2) + 1), this.graph, EnemyColor[_i - 1]);
      let enemyController: EnemyController = new EnemyController("EnemySnake", enemySnake, data.enemyDetectionRange);
      return enemyController;
    }
    private CreateFoodArray(): ƒ.Node[] {
      let foodContainer: ƒ.Node[] = [];

      for (let i: number = 0; i < data.foodAmount; i++) {
        let food: ƒ.Node = this.CreateFood();
        this.graph.appendChild(food);
        foodContainer.push(food);
      }
      return foodContainer;
    }
    private CreateFood(): ƒ.Node {
      let meshCube: ƒ.Mesh = new ƒ.MeshCube();
      let mtrSolidRed: ƒ.Material = new ƒ.Material("SolidRed", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Red")));
      let food: ƒ.Node = CreateNode("Food", meshCube, mtrSolidRed, this.GetRandomPosition(), ƒ.Vector3.ONE(0.8));
      return food;
    }
    private GetRandomPosition(): ƒ.Vector3 {
      let x: number = Math.floor((Math.random() * (data.gameFieldSize.x + 2)) - ((data.gameFieldSize.x + 2) / 2) + 1);
      let y: number = Math.floor((Math.random() * (data.gameFieldSize.y + 2)) - ((data.gameFieldSize.y + 2) / 2) + 1);
      let z: number = Math.floor((Math.random() * (data.gameFieldSize.y + 2)) - ((data.gameFieldSize.y + 2) / 2) + 1);

      let rndSide: number = Math.floor(Math.random() * 6);
      switch (rndSide) {
        case 0:
          x = -(data.gameFieldSize.x / 2);
          break;
        case 1:
          x = (data.gameFieldSize.x / 2 + 1);
          break;
        case 2:
          y = -(data.gameFieldSize.y / 2);
          break;
        case 3:
          y = (data.gameFieldSize.y / 2 + 1);
          break;
        case 4:
          z = -(data.gameFieldSize.z / 2);
          break;
        case 5:
          z = (data.gameFieldSize.z / 2 + 1);
          break;
        default:
          break;
      }
      let pos: ƒ.Vector3 = new ƒ.Vector3(x, y, z);
      return pos;
    }
  }
}