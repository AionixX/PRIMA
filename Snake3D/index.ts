namespace Snake3D {

  import ƒ = FudgeCore;

  window.addEventListener("load", Init);

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;

  let gameField: ƒ.Node;
  let snake: Snake;

  let newRotation: ƒ.Vector3;

  let gameFieldSize: number = 20;
  let gamePaused: boolean = false;
  let gameEnd: boolean = false;
  let score: number = 0;

  let food: ƒ.Node;

  function Init(): void {
    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(50);
    camera.pivot.rotateY(180);
    gameField = CreateGameField();

    snake = new Snake(new ƒ.Vector3(0, 0, gameFieldSize / 2));
    gameField.appendChild(snake.head.elementNode);

    food = CreateFood();
    gameField.appendChild(food);

    newRotation = ƒ.Vector3.ZERO();
    gameField.appendChild(snake.AddSnakeElement().elementNode);
    gameField.appendChild(snake.AddSnakeElement().elementNode);
    gameField.appendChild(snake.AddSnakeElement().elementNode);
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", gameField, camera, canvas);

    viewport.draw();

    document.addEventListener("keydown", HandleInput);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Update);
    ƒ.Loop.start();
    setTimeout(SnakeLoop, 150);
  }
  function SnakeLoop(): void {
    if (!gameEnd) {
      if (!gamePaused) {
        snake.Rotate(newRotation);
        snake.Move();
        snake.UpdatePosition();
        newRotation = ƒ.Vector3.ZERO();
        CheckCollision();
        CheckWalls();
        let fps: number = 150 - (score * 5);
        console.log(fps);
        setTimeout(SnakeLoop, fps > 5 ? fps : 5);
      }
    }
  }
  function Update(): void {
    camera.pivot.lookAt(ƒ.Vector3.ZERO());
    viewport.draw();
  }
  function HandleInput(_event: KeyboardEvent): void {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.ARROW_UP:
        camera.pivot.translateY(2);
        break;
      case ƒ.KEYBOARD_CODE.ARROW_DOWN:
        camera.pivot.translateY(-2);
        break;
      case ƒ.KEYBOARD_CODE.ARROW_LEFT:
        camera.pivot.translateX(2);
        break;
      case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
        camera.pivot.translateX(-2);
        break;
      case ƒ.KEYBOARD_CODE.A:
        if (!snake.IsOnEdge()) {
          newRotation = new ƒ.Vector3(0, 0, 90);
        }
        break;
      case ƒ.KEYBOARD_CODE.D:
        if (!snake.IsOnEdge()) {
          newRotation = new ƒ.Vector3(0, 0, -90);
        }
        break;
      case ƒ.KEYBOARD_CODE.SPACE:
        gamePaused = !gamePaused;
        setTimeout(SnakeLoop, 150);
      default:
        newRotation = ƒ.Vector3.ZERO();
    }
  }
  function CreateFood(): ƒ.Node {
    let mtrSolidRed: ƒ.Material = new ƒ.Material("SolidRed", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("Red")));
    let meshQuad: ƒ.MeshCube = new ƒ.MeshCube;
    let rndPos: ƒ.Vector3 = GetRandomPosition();
    let food: ƒ.Node = createNode("Food", meshQuad, mtrSolidRed, rndPos, new ƒ.Vector3(0.8, 0.8, 0.8));

    return food;
  }
  function GetRandomPosition(): ƒ.Vector3 {
    let rndPos: ƒ.Vector3 = new ƒ.Vector3(10, 0, 0);
    let rndSide: number = Math.floor(Math.random() * 5);
    switch (rndSide) {
      case 0:
        rndPos = RndPosLeft();
        break;
      case 1:
        rndPos = RndPosUp();
        break;
      case 2:
        rndPos = RndPosRight();
        break;
      case 3:
        rndPos = RndPosDown();
        break;
      case 4:
        rndPos = RndPosFront();
        break;
      case 5:
        rndPos = RndPosBack();
        break;
    }
    return rndPos;
  }
  function RndPosLeft(): ƒ.Vector3 {
    let pos: ƒ.Vector3 = new ƒ.Vector3();
    pos.x = -11;
    pos.y = Math.floor((Math.random() * 18) - 9);
    pos.z = Math.floor((Math.random() * 18) - 9);
    return pos;
  }
  function RndPosUp(): ƒ.Vector3 {
    let pos: ƒ.Vector3 = new ƒ.Vector3();
    pos.x = Math.floor((Math.random() * 18) - 9);
    pos.y = 10;
    pos.z = Math.floor((Math.random() * 18) - 9);
    return pos;
  }
  function RndPosRight(): ƒ.Vector3 {
    let pos: ƒ.Vector3 = new ƒ.Vector3();
    pos.x = 10;
    pos.y = Math.floor((Math.random() * 18) - 9);
    pos.z = Math.floor((Math.random() * 18) - 9);
    return pos;
  }
  function RndPosDown(): ƒ.Vector3 {
    let pos: ƒ.Vector3 = new ƒ.Vector3();
    pos.x = Math.floor((Math.random() * 18) - 9);
    pos.y = -11;
    pos.z = Math.floor((Math.random() * 18) - 9);
    return pos;
  }
  function RndPosFront(): ƒ.Vector3 {
    let pos: ƒ.Vector3 = new ƒ.Vector3();
    pos.x = Math.floor((Math.random() * 18) - 9);
    pos.y = Math.floor((Math.random() * 18) - 9);
    pos.z = 10;
    return pos;
  }
  function RndPosBack(): ƒ.Vector3 {
    let pos: ƒ.Vector3 = new ƒ.Vector3();
    pos.x = Math.floor((Math.random() * 18) - 9);
    pos.y = Math.floor((Math.random() * 18) - 9);
    pos.z = -11;
    return pos;
  }
  function CheckWalls(): void {
    console.log(snake.head.position);
    if (snake.IsOnEdge()) {
      newRotation = new ƒ.Vector3(-90, 0, 0);
    }
  }
  function CheckCollision(): void {
    if (snake.IsSnakeCollidingWith(food.cmpTransform.local.translation)) {
      score++;
      gameField.appendChild(snake.AddSnakeElement().elementNode);
      food.cmpTransform.local.translation = GetRandomPosition();
    }
    if (snake.IsSnakeCollidingWhithItSelf()) {
      gameEnd = true;
    }
  }
  function CreateGameField(): ƒ.Node {
    let gameField: ƒ.Node = new ƒ.Node("GameField");
    gameField.addComponent(new ƒ.ComponentTransform);

    let mtrSolidGray: ƒ.Material = new ƒ.Material("SolidGray", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("Gray")));
    let meshQuad: ƒ.MeshCube = new ƒ.MeshCube;

    let cube: ƒ.Node = createNode("GameCube", meshQuad, mtrSolidGray, new ƒ.Vector3(-0.5, -0.5, -0.5), new ƒ.Vector3(gameFieldSize, gameFieldSize, gameFieldSize));
    gameField.appendChild(cube);

    return gameField;
  }
  function createNode(_name: string, _mesh: ƒ.Mesh, _material: ƒ.Material, _translation: ƒ.Vector3, _scaling: ƒ.Vector3): ƒ.Node {
    let node: ƒ.Node = new ƒ.Node(_name);
    node.addComponent(new ƒ.ComponentTransform);
    node.addComponent(new ƒ.ComponentMaterial(_material));
    node.addComponent(new ƒ.ComponentMesh(_mesh));
    node.cmpTransform.local.translate(_translation);
    node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling);

    return node;
  }
}