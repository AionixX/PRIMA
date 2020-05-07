namespace Snake3D {

  class SnakeElement {

    isSnakeHead: boolean;
    elementNode: ƒ.Node;
    previousElement: SnakeElement = null;
    nextElement: SnakeElement = null;
    position: ƒ.Vector3;

    constructor(elementNode: ƒ.Node, position: ƒ.Vector3, isSnakeHead: boolean) {
      this.isSnakeHead = isSnakeHead;
      this.elementNode = elementNode;
      this.position = position;
    }
  }

  import ƒ = FudgeCore;

  window.addEventListener("load", Init);

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;

  let gameField: ƒ.Node;
  let SnakeHead: SnakeElement;

  let gameFieldWidth: number = 20;
  let gameFieldHeight: number = 20;
  let gameFieldDepth: number = 20;

  function Init(): void {
    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(50);
    camera.pivot.rotateY(180);

    gameField = CreateGameField();

    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", gameField, camera, canvas);

    viewport.draw();

    document.addEventListener("keypress", HandleInput);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Update);
    ƒ.Loop.start();
  }
  function Update(): void {
    console.log("Update");
    viewport.draw();
  }
  function HandleInput(_event: KeyboardEvent): void {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.NUMPAD8:
        break;
      case ƒ.KEYBOARD_CODE.NUMPAD5:
        break;
      case ƒ.KEYBOARD_CODE.NUMPAD4:
        break;
      case ƒ.KEYBOARD_CODE.NUMPAD6:
        break;
      case ƒ.KEYBOARD_CODE.W:
        break;
      case ƒ.KEYBOARD_CODE.A:
        break;
      case ƒ.KEYBOARD_CODE.S:
        break;
      case ƒ.KEYBOARD_CODE.D:
        break;
    }
  }
  function AddSnakeElement(element: SnakeElement): void {
    if (element.nextElement == null) {
      let newElement: ƒ.Node = CreateSnakeElement(element.position);
      let snakeElement: SnakeElement = new SnakeElement(newElement, element.position, false);
      element.nextElement = snakeElement;
      snakeElement.previousElement = element;
    } else {
      AddSnakeElement(element.nextElement);
    }
  }
  function CreateSnakeHead(): SnakeElement {
    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
    let meshSphere: ƒ.MeshCube = new ƒ.MeshCube;
    let headElement: ƒ.Node = createNode("SnakeHead", meshSphere, mtrSolidWhite, new ƒ.Vector3(0, 0, 0), new ƒ.Vector3(1, 1, 1));
    let snakeHead: SnakeElement = new SnakeElement(headElement, new ƒ.Vector3(0, 0, 0), true);
    return snakeHead;
  }
  function CreateGameField(): ƒ.Node {
    let gameField: ƒ.Node = new ƒ.Node("GameField");
    gameField.addComponent(new ƒ.ComponentTransform);

    let mtrSolidGray: ƒ.Material = new ƒ.Material("SolidGray", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("Gray")));
    let meshQuad: ƒ.MeshCube = new ƒ.MeshCube;

    for (let x: number = 0; x < gameFieldWidth; x++) {
      for (let y: number = 0; y < gameFieldHeight; y++) {
        for (let z: number = 0; z < gameFieldDepth; z++) {
          let posX: number = x - (gameFieldWidth / 2);
          let posY: number = y - (gameFieldHeight / 2);
          let posZ: number = z - (gameFieldDepth / 2);
          let cube: ƒ.Node = createNode("GameCube", meshQuad, mtrSolidGray, new ƒ.Vector3(posX, posY, posZ), new ƒ.Vector3(1, 1, 1));
          gameField.appendChild(cube);
        }
      }
    }

    return gameField;
  }
  function CreateSnakeElement(position: ƒ.Vector3): ƒ.Node {
    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
    let meshQuad: ƒ.MeshCube = new ƒ.MeshCube;
    let element: ƒ.Node = createNode("SnakeElement", meshQuad, mtrSolidWhite, position, new ƒ.Vector3(1, 1, 1));
    return element;
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