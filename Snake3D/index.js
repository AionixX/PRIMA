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
    let gamePaused = false;
    let gameEnd = false;
    let score = 0;
    let scoreSpan;
    let food;
    function Init() {
        camera = new ƒ.ComponentCamera();
        camera.pivot.translateZ(50);
        camera.pivot.rotateY(180);
        gameField = CreateGameField();
        gameField.appendChild(CreateLights());
        snake = new Snake3D.Snake(new ƒ.Vector3(0, 0, gameFieldSize / 2));
        food = CreateFood();
        scoreSpan = document.querySelector("#score");
        newRotation = ƒ.Vector3.ZERO();
        gameField.appendChild(snake.head.elementNode);
        gameField.appendChild(food);
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
        setTimeout(SnakeLoop, 150);
    }
    function SnakeLoop() {
        if (!gameEnd) {
            if (!gamePaused) {
                snake.Rotate(newRotation);
                snake.Move();
                snake.UpdatePosition();
                newRotation = ƒ.Vector3.ZERO();
                CheckCollision();
                CheckWalls();
                let fps = 150 - (score * 5);
                setTimeout(SnakeLoop, fps > 5 ? fps : 5);
            }
        }
    }
    function Update() {
        camera.pivot.lookAt(ƒ.Vector3.ZERO());
        console.log(camera.pivot.translation.z);
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
    function CreateLights() {
        //let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(new ƒ.Color(1, 1, 0.1)));
        let lights = new ƒ.Node("lights");
        let cmpLightDirectionFront = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 1, 1)));
        cmpLightDirectionFront.pivot.lookAt(new ƒ.Vector3(-8, -10, 15));
        let cmpLightDirectionBack = new ƒ.ComponentLight(new ƒ.LightDirectional(new ƒ.Color(1, 1, 1)));
        cmpLightDirectionBack.pivot.lookAt(new ƒ.Vector3(8, 10, -15));
        lights.addComponent(cmpLightDirectionFront);
        lights.addComponent(cmpLightDirectionBack);
        return lights;
    }
    function CreateFood() {
        let mtrSolidRed = new ƒ.Material("SolidRed", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Red")));
        let meshQuad = new ƒ.MeshCube;
        let rndPos = GetRandomPosition();
        let food = createNode("Food", meshQuad, mtrSolidRed, rndPos, new ƒ.Vector3(0.8, 0.8, 0.8));
        return food;
    }
    function GetRandomPosition() {
        let rndPos = new ƒ.Vector3(10, 0, 0);
        let rndSide = Math.floor(Math.random() * 5);
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
    function RndPosLeft() {
        let pos = new ƒ.Vector3();
        pos.x = -11;
        pos.y = Math.floor((Math.random() * 18) - 9);
        pos.z = Math.floor((Math.random() * 18) - 9);
        return pos;
    }
    function RndPosUp() {
        let pos = new ƒ.Vector3();
        pos.x = Math.floor((Math.random() * 18) - 9);
        pos.y = 10;
        pos.z = Math.floor((Math.random() * 18) - 9);
        return pos;
    }
    function RndPosRight() {
        let pos = new ƒ.Vector3();
        pos.x = 10;
        pos.y = Math.floor((Math.random() * 18) - 9);
        pos.z = Math.floor((Math.random() * 18) - 9);
        return pos;
    }
    function RndPosDown() {
        let pos = new ƒ.Vector3();
        pos.x = Math.floor((Math.random() * 18) - 9);
        pos.y = -11;
        pos.z = Math.floor((Math.random() * 18) - 9);
        return pos;
    }
    function RndPosFront() {
        let pos = new ƒ.Vector3();
        pos.x = Math.floor((Math.random() * 18) - 9);
        pos.y = Math.floor((Math.random() * 18) - 9);
        pos.z = 10;
        return pos;
    }
    function RndPosBack() {
        let pos = new ƒ.Vector3();
        pos.x = Math.floor((Math.random() * 18) - 9);
        pos.y = Math.floor((Math.random() * 18) - 9);
        pos.z = -11;
        return pos;
    }
    function CheckWalls() {
        if (snake.IsOnEdge()) {
            newRotation = new ƒ.Vector3(-90, 0, 0);
        }
    }
    function CheckCollision() {
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
    function CreateGameField() {
        let gameField = new ƒ.Node("GameField");
        gameField.addComponent(new ƒ.ComponentTransform);
        let mtrSolidGray = new ƒ.Material("SolidGray", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Gray")));
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