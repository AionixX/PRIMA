namespace Snake {
  class SnakeElement {

    isSnakeHead: boolean;
    elementNode: ƒ.Node;
    previousElement: SnakeElement;
    nextElement: SnakeElement;
    position: ƒ.Vector2;
  
    constructor(elementNode: ƒ.Node, position: ƒ.Vector2, previousElement: SnakeElement, nextElement: SnakeElement, isSnakeHead: boolean) {
      this.isSnakeHead = isSnakeHead;
  
      if (isSnakeHead == true) {
        this.previousElement = null;
        this.nextElement = null;
      } else {
        this.nextElement = nextElement;
        this.previousElement = previousElement;
      }
      this.position = position;
      this.elementNode = elementNode;
    }
  }

  import ƒ = FudgeCore;
  
  let game: ƒ.Node;
  let snake: SnakeElement[] = [];
  let snakeHead: SnakeElement;
  
  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;
  
  let direction: ƒ.Vector2 = new ƒ.Vector2(0, 1);
  let newDirection: ƒ.Vector2 = new ƒ.Vector2(0, 1);

  let foodNode: ƒ.Node;
  let foodPosition: ƒ.Vector2;

  let playerScore: number = 0;
  let scoreElement: HTMLHeadElement;
  let againButton: HTMLButtonElement;

  let processTime: number = 250;
  let gamePaused: boolean = false;
  let gameEnd: boolean = false;

  let addedNewElement: boolean = false;

  window.addEventListener("load", init);

  function init(): void {
    game = createGame();
    addSnakeElement();
    addFood();
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    scoreElement = document.querySelector("h2[name=Score]");
    againButton = document.querySelector("button[name=againButton]");
    againButton.addEventListener("click", () => {
      location.reload();
    });

    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(50);
    camera.pivot.rotateY(180);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", game, camera, canvas);

    viewport.draw();

    document.addEventListener("keypress", handleInput);

    setTimeout(updateSnake, processTime);
  }

  function updateSnake(): void {
    if (!gameEnd) {
      if (!gamePaused) {
        moveSnake();
        updatePositions();
        viewport.draw();
        checkCollisions();
      }
      setTimeout(updateSnake, processTime);
    }
  }

  function checkCollisions(): void {
    if (snakeHead.position.y >= 15) {
      snakeHead.elementNode.cmpTransform.local.translation = new ƒ.Vector2(snakeHead.position.x, -15).toVector3();
    }
    if (snakeHead.position.y <= -15) {
      snakeHead.elementNode.cmpTransform.local.translation = new ƒ.Vector2(snakeHead.position.x, 15).toVector3();
    }
    if (snakeHead.position.x >= 20) {
      snakeHead.elementNode.cmpTransform.local.translation = new ƒ.Vector2(-20, snakeHead.position.y).toVector3();
    }
    if (snakeHead.position.x <= -20) {
      snakeHead.elementNode.cmpTransform.local.translation = new ƒ.Vector2(20, snakeHead.position.y).toVector3();
    }

    if (snakeHead.position.equals(foodPosition)) {
      playerScore++;
      addSnakeElement();
      scoreElement.innerText = "Your Score: " + playerScore;
      foodPosition = getRandomPosition();
      foodNode.cmpTransform.local.translation = foodPosition.toVector3();
    }

    for (let element of snake) {
      if (element.isSnakeHead != true) {
        if (snakeHead.position.equals(element.position)) {
          if (!addedNewElement) {
            gameEnd = true;
            alert("Game Over!");
            againButton.style.display = "block";
          } else {
            addedNewElement = false;
          }
        }
      }
    }
  }

  function handleInput(_event: KeyboardEvent): void {
    if (_event.key == "w") {
      if (direction.y != -1) {
        newDirection = new ƒ.Vector2(0, 1);
      }
    }
    if (_event.key == "a") {
      if (direction.x != 1) {
        newDirection = new ƒ.Vector2(-1, 0);
      }
    }
    if (_event.key == "s") {
      if (direction.y != 1) {
        newDirection = new ƒ.Vector2(0, -1);
      }
    }
    if (_event.key == "d") {
      if (direction.x != -1) {
        newDirection = new ƒ.Vector2(1, 0);
      }
    }
    if (_event.key == " ") {
      if (gamePaused == true) {
        gamePaused = false;
      } else {
        gamePaused = true;
      }
    }
  }

  function moveSnake(): void {
    direction = newDirection;

    snakeHead.elementNode.cmpTransform.local.translate(direction.toVector3());
    let endReached: boolean = false;
    let actualElement: SnakeElement = snakeHead;

    while (!endReached) {
      if (actualElement.nextElement == null) {
        endReached = true;
      } else {
        actualElement.nextElement.elementNode.cmpTransform.local.translation = actualElement.position.toVector3();
        actualElement = actualElement.nextElement;
      }
    }
  }

  function updatePositions(): void {
    for ( let element of snake) {
      element.position = element.elementNode.cmpTransform.local.translation.toVector2();
    }
  }

  function createGame(): ƒ.Node {
    let game: ƒ.Node = new ƒ.Node("Game");

    let mtrSolidGray: ƒ.Material = new ƒ.Material("SolidGray", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GRAY")));
    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad;

    game.appendChild(createNode("WallLeft", meshQuad, mtrSolidGray, new ƒ.Vector2(-20, 0), new ƒ.Vector2(1, 30)));
    game.appendChild(createNode("WallRight", meshQuad, mtrSolidGray, new ƒ.Vector2(20, 0), new ƒ.Vector2(1, 30)));
    game.appendChild(createNode("WallTop", meshQuad, mtrSolidGray, new ƒ.Vector2(0, 15), new ƒ.Vector2(41, 1)));
    game.appendChild(createNode("WallBottom", meshQuad, mtrSolidGray, new ƒ.Vector2(0, -15), new ƒ.Vector2(41, 1)));

    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
    let meshRound: ƒ.MeshSphere = new ƒ.MeshSphere;

    let headPosition: ƒ.Vector2 = new ƒ.Vector2(0, 0);

    let snakeHeadNode: ƒ.Node = createNode("SnakeHead", meshRound, mtrSolidWhite, headPosition, new ƒ.Vector2(1, 1));
    snakeHead = new SnakeElement(snakeHeadNode, headPosition, null, null, true);
    snakeHead.position = snakeHeadNode.cmpTransform.local.translation.toVector2();

    snake.push(snakeHead);
    game.appendChild(snakeHeadNode);

    return game;
  }

  function addSnakeElement(): void {
    addedNewElement = true;

    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad;

    let elementNode: ƒ.Node = createNode("snakeElement", meshQuad, mtrSolidWhite, snakeHead.position, new ƒ.Vector2(0.8, 0.8));
    game.appendChild(elementNode);

    let newElement: SnakeElement = new SnakeElement(elementNode, snakeHead.position, snakeHead, snakeHead.nextElement, false);

    if (snakeHead.nextElement) {
      snakeHead.nextElement.previousElement = newElement;
      snakeHead.nextElement = newElement;
    } else {
      snakeHead.nextElement = newElement;
    }
    
    snake.push(newElement);
  }

  function addFood(): void {
    let mtrSolidRed: ƒ.Material = new ƒ.Material("SolidRed", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("Red")));
    let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad;
    foodPosition = getRandomPosition();
    let newFood: ƒ.Node = createNode("Food", meshQuad, mtrSolidRed, foodPosition, new ƒ.Vector2(0.5, 0.5));
    foodNode = newFood;
    game.appendChild(newFood);
  }

  function getRandomPosition(): ƒ.Vector2 {
    let rndX: number = Math.floor((Math.random() * 38) - 19);
    let rndY: number = Math.floor((Math.random() * 28) - 14);

    let random: ƒ.Vector2 = new ƒ.Vector2(rndX, rndY);
    for (let element of snake) {
      if (element.position.equals(random)) {
        return getRandomPosition();
      }
    }
    return random;
  }

  function createNode(_name: string, _mesh: ƒ.Mesh, _material: ƒ.Material, _translation: ƒ.Vector2, _scaling: ƒ.Vector2): ƒ.Node {
    let node: ƒ.Node = new ƒ.Node(_name);
    node.addComponent(new ƒ.ComponentTransform);
    node.addComponent(new ƒ.ComponentMaterial(_material));
    node.addComponent(new ƒ.ComponentMesh(_mesh));
    node.cmpTransform.local.translate(_translation.toVector3());
    node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling.toVector3());

    return node;
  }
}