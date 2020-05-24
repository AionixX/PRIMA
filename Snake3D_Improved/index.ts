namespace Snake3D_Improved {

  export import ƒ = FudgeCore;

  window.addEventListener("load", Init);

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;

  let graph: ƒ.Node;
  var gameController: GameController;

  function Init(): void {

    document.addEventListener("keydown", HandleInput);

    let enemyInput: HTMLInputElement = document.querySelector("#nEnemys");
    enemyInput.addEventListener("change", () => {
      data.nEnemys = parseInt(enemyInput.value);
    });

    let timeInput: HTMLInputElement = document.querySelector("#time");
    timeInput.addEventListener("change", () => {
      data.roundTime = parseInt(timeInput.value);
    });

    let foodInput: HTMLInputElement = document.querySelector("#nFood");
    foodInput.addEventListener("change", () => {
      data.foodAmount = parseInt(foodInput.value);
    });

    let fpsInput: HTMLInputElement = document.querySelector("#fps");
    fpsInput.addEventListener("change", () => {
      data.fps = parseInt(fpsInput.value);
    });

    

    let startButton: HTMLButtonElement = document.querySelector("#startGame");
    startButton.addEventListener("click", StartGame);
    
  }
  function StartGame(): void {
    console.log("Heer");
    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(50);
    camera.pivot.rotateY(180);

    graph = new ƒ.Node("Graph");
    graph.appendChild(CreateLights());
    graph.appendChild(CreateGameField(data.gameFieldSize));


    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, camera, canvas);
    viewport.draw();

    gameController = new GameController(data.roundTime, data.nEnemys, graph, viewport);

    gameController.AddElementToPlayerSnake();
    gameController.AddElementToPlayerSnake();
    gameController.AddElementToPlayerSnake();
    gameController.AddElementToPlayerSnake();
    gameController.AddElementToPlayerSnake();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, data.fps);
  }
  function Update(): void {
    if (gameController.IsGameEnded() || gameController.IsGamePaused())
      return;

    gameController.Update();
    viewport.draw();

  }
  function HandleInput(_event: KeyboardEvent): void {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.SPACE:
        gameController.PauseGame();
        break;
      case ƒ.KEYBOARD_CODE.A:
        gameController.TurnPlayerSnakeLeft();
        break;
      case ƒ.KEYBOARD_CODE.D:
        gameController.TurnPlayerSnakeRight();
        break;
    }
  }
  function CreateGameField(_size: ƒ.Vector3): ƒ.Node {
    let meshCube: ƒ.Mesh = new ƒ.MeshCube();
    let mtrSolidGray: ƒ.Material = new ƒ.Material("SolidGray", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Gray")));

    let gameField: ƒ.Node = CreateNode("GameField", meshCube, mtrSolidGray, new ƒ.Vector3(0.5, 0.5, 0.5), _size);
    return gameField;
  }
  export function CreateNode(_name: string, _mesh: ƒ.Mesh, _material: ƒ.Material, _translation: ƒ.Vector3, _scaling: ƒ.Vector3): ƒ.Node {
    let node: ƒ.Node = new ƒ.Node(_name);
    node.addComponent(new ƒ.ComponentTransform);
    node.addComponent(new ƒ.ComponentMaterial(_material));
    node.addComponent(new ƒ.ComponentMesh(_mesh));
    node.cmpTransform.local.translate(_translation);
    node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling);

    return node;
  }
  function CreateLights(): ƒ.Node {
    let lights: ƒ.Node = new ƒ.Node("lights");

    let cmpLightDirectionFront: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 1, 1)));
    cmpLightDirectionFront.pivot.lookAt(new ƒ.Vector3(-8, -10, 15));

    let cmpLightDirectionBack: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 1, 1)));
    cmpLightDirectionBack.pivot.lookAt(new ƒ.Vector3(8, 10, -15));

    lights.addComponent(cmpLightDirectionFront);
    lights.addComponent(cmpLightDirectionBack);

    return lights;
  }
}