"use strict";
var Snake3D;
(function (Snake3D) {
    var ƒ = FudgeCore;
    window.addEventListener("load", Init);
    let camera;
    let viewport;
    let gameField;
    let snake;
    let newRotation;
    let gameFieldSize = 20;
    function Init() {
        camera = new ƒ.ComponentCamera();
        camera.pivot.translateZ(50);
        camera.pivot.rotateY(180);
        gameField = CreateGameField();
        snake = new Snake3D.Snake(new ƒ.Vector3(0, 0, gameFieldSize / 2));
        gameField.appendChild(snake.head.elementNode);
        newRotation = ƒ.Vector3.ZERO();
        gameField.appendChild(snake.AddSnakeElement().elementNode);
        gameField.appendChild(snake.AddSnakeElement().elementNode);
        gameField.appendChild(snake.AddSnakeElement().elementNode);
        const canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", gameField, camera, canvas);
        viewport.draw();
        document.addEventListener("keydown", HandleInput);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, Update);
        ƒ.Loop.start();
        setInterval(SnakeLoop, 300);
    }
    function SnakeLoop() {
        snake.Rotate(newRotation);
        snake.Move();
        snake.UpdatePosition();
        newRotation = ƒ.Vector3.ZERO();
        CheckCollision();
        CheckWalls();
    }
    function Update() {
        camera.pivot.lookAt(ƒ.Vector3.ZERO());
        viewport.draw();
    }
    function HandleInput(_event) {
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
    function CheckWalls() {
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
    function CheckCollision() {
        //TODO Collision
    }
    function CreateGameField() {
        let gameField = new ƒ.Node("GameField");
        gameField.addComponent(new ƒ.ComponentTransform);
        let mtrSolidGray = new ƒ.Material("SolidGray", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("Gray")));
        let meshQuad = new ƒ.MeshCube;
        let cube = createNode("GameCube", meshQuad, mtrSolidGray, new ƒ.Vector3(-0.5, -0.5, -0.5), new ƒ.Vector3(gameFieldSize, gameFieldSize, gameFieldSize));
        gameField.appendChild(cube);
        return gameField;
    }
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new ƒ.Node(_name);
        node.addComponent(new ƒ.ComponentTransform);
        node.addComponent(new ƒ.ComponentMaterial(_material));
        node.addComponent(new ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation);
        node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling);
        return node;
    }
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=index.js.map