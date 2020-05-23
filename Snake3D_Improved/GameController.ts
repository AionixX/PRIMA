namespace Snake3D_Improved {

  export class GameController {
    roundTime: number;
    nEnemys: number;
    controller: EnemyController[];
    playerSnake: Snake;
    timeLeft: number;
    graph: ƒ.Node;
    food: ƒ.Node[];
    viewport: ƒ.Viewport;
    gamePaused: boolean;
    gameEnded: boolean;

    constructor(_roundTime: number, _nEnemys: number, _graph: ƒ.Node, _viewport: ƒ.Viewport) {
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

      for (let i: number = 0; i < this.nEnemys; i++) {
        this.controller.push(this.CreateEnemyController());
      }
    }
    public Update(): void {
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
    }
    private CreatePlayerSnake(): Snake {
      let snake: Snake = new Snake(new ƒ.Vector3(0, 0, (data.gameFieldSize.z / 2) + 1), this.graph);
      return snake;
    }
    private CreateEnemyController(): EnemyController {
      let enemySnake: EnemySnake = new EnemySnake(this.GetRandomPosition(), this.graph);
      let enemyController: EnemyController = new EnemyController("EnemySnake", enemySnake, data.enemyDetectionRange);
      return enemyController;
    }
    private CreateFood(): ƒ.Node[] {
      let foodContainer: ƒ.Node[] = [];
      let meshCube: ƒ.Mesh = new ƒ.MeshCube();
      let mtrSolidRed: ƒ.Material = new ƒ.Material("SolidRed", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Red")));

      for (let i: number = 0; i < data.foodAmount; i++) {
        let food: ƒ.Node = CreateNode("Food", meshCube, mtrSolidRed, this.GetRandomPosition(), ƒ.Vector3.ONE(0.8));
        foodContainer.push(food);
        this.graph.appendChild(food);
      }
      return foodContainer;
    }
    private GetRandomPosition(): ƒ.Vector3 {
      let x: number = Math.floor((Math.random() * data.gameFieldSize.x + 3) - ((data.gameFieldSize.x + 2) / 2));
      let y: number = Math.floor((Math.random() * data.gameFieldSize.y + 3) - ((data.gameFieldSize.y + 2) / 2));
      let z: number = 11;
      let pos: ƒ.Vector3 = new ƒ.Vector3(x, y, z);
      return pos;
    }
  }
}