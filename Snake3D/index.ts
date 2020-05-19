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
  let scoreSpan: HTMLSpanElement;

  let food: ƒ.Node;

  function Init(): void {
    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(50);
    camera.pivot.rotateY(180);

    gameField = CreateGameField();
    gameField.appendChild(CreateLights());

    snake = new Snake(new ƒ.Vector3(0, 0, gameFieldSize / 2));
    food = CreateFood();
    scoreSpan = document.querySelector("#score");

    newRotation = ƒ.Vector3.ZERO();

    gameField.appendChild(snake.head.elementNode);
    gameField.appendChild(food);

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
    if (gameEnd)
      return;
    if (gamePaused)
      return;
    snake.Rotate(newRotation);
    newRotation = ƒ.Vector3.ZERO();
    snake.Move();
    snake.UpdatePosition();
    CheckCollision();
    CheckWalls();
    let tbf: number = 150 - (score * 5);
    setTimeout(SnakeLoop, tbf > 5 ? tbf : 5);
  }
  function Update(): void {
    camera.pivot.lookAt(ƒ.Vector3.ZERO());
    console.log(camera.pivot.translation.z);
    viewport.draw();
  }
  function HandleInput(_event: KeyboardEvent): void {
    if (_event.code == ƒ.KEYBOARD_CODE.ARROW_UP) {
      camera.pivot.translateY(2);
    }
    if (_event.code == ƒ.KEYBOARD_CODE.ARROW_DOWN) {
      camera.pivot.translateY(-2);
    }
    if (_event.code == ƒ.KEYBOARD_CODE.ARROW_LEFT) {
      camera.pivot.translateX(2);
    }
    if (_event.code == ƒ.KEYBOARD_CODE.ARROW_RIGHT) {
      camera.pivot.translateX(-2);
    }
    switch (_event.code) {
      /*case ƒ.KEYBOARD_CODE.ARROW_UP:
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
        break;*/
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
  function CreateLights(): ƒ.Node {
    //let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(new ƒ.Color(1, 1, 0.1)));
    let lights: ƒ.Node = new ƒ.Node("lights");

    let cmpLightDirectionFront: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 1, 1)));
    cmpLightDirectionFront.pivot.lookAt(new ƒ.Vector3(-8, -10, 15));

    let cmpLightDirectionBack: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 1, 1)));
    cmpLightDirectionBack.pivot.lookAt(new ƒ.Vector3(8, 10, -15));

    lights.addComponent(cmpLightDirectionFront);
    lights.addComponent(cmpLightDirectionBack);

    return lights;
  }
  function CreateFood(): ƒ.Node {
    let mtrSolidRed: ƒ.Material = new ƒ.Material("SolidRed", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Red")));
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
    if (snake.IsOnEdge()) {
      newRotation = new ƒ.Vector3(-90, 0, 0);
    }
  }
  function CheckCollision(): void {
    if (snake.IsSnakeCollidingWith(food.cmpTransform.local.translation)) {
      score++;
      scoreSpan.innerText = score.toString();
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

    let mtrSolidGray: ƒ.Material = new ƒ.Material("SolidGray", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Gray")));
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