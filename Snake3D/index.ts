namespace Snake3D {

  import ƒ = FudgeCore;

  window.addEventListener("load", Init);

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;

  let gameField: ƒ.Node;
  let snake: Snake;

  let newRotation: ƒ.Vector3;

  let gameFieldSize: number = 20;

  function Init(): void {
    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(50);
    camera.pivot.rotateY(180);
    

    gameField = CreateGameField();

    snake = new Snake(new ƒ.Vector3(0, 0, gameFieldSize / 2));
    gameField.appendChild(snake.head.elementNode);

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

    setInterval(SnakeLoop, 300);
  }
  function SnakeLoop(): void {
    snake.Rotate(newRotation);
    snake.Move();
    snake.UpdatePosition();
    newRotation = ƒ.Vector3.ZERO();
    CheckCollision();
    CheckWalls();
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
        newRotation = new ƒ.Vector3(0, 0, 90);
        break;
      case ƒ.KEYBOARD_CODE.D:
        newRotation = new ƒ.Vector3(0, 0, -90);
        break;
      default:
        newRotation = ƒ.Vector3.ZERO();
    }
  }
  function CheckWalls(): void {
    if (snake.head.position.y == 10) {
      if (snake.head.position.z == 10) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.z == -11) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.x == 10) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.x == -11) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
    }
    if (snake.head.position.y == -11) {
      if (snake.head.position.z == 10) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.z == -11) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.x == 10) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
    }
    if (snake.head.position.x == 10) {
      if (snake.head.position.z == 10) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.z == -11) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.y == 10) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
    }
    if (snake.head.position.x == -11) {
      if (snake.head.position.z == 10) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.z == -11) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.y == -11) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
      if (snake.head.position.y == 10) {
        newRotation = new ƒ.Vector3(-90, 0, 0);
      }
    }
  }
  function CheckCollision(): void {
    //TODO Collision
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