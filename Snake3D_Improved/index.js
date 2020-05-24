"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    Snake3D_Improved.ƒ = FudgeCore;
    window.addEventListener("load", Init);
    let camera;
    let viewport;
    let graph;
    var gameController;
    function Init() {
        document.addEventListener("keydown", HandleInput);
        let enemyInput = document.querySelector("#nEnemys");
        enemyInput.addEventListener("change", () => {
            Snake3D_Improved.data.nEnemys = parseInt(enemyInput.value);
        });
        let timeInput = document.querySelector("#time");
        timeInput.addEventListener("change", () => {
            Snake3D_Improved.data.roundTime = parseInt(timeInput.value);
        });
        let foodInput = document.querySelector("#nFood");
        foodInput.addEventListener("change", () => {
            Snake3D_Improved.data.foodAmount = parseInt(foodInput.value);
        });
        let fpsInput = document.querySelector("#fps");
        fpsInput.addEventListener("change", () => {
            Snake3D_Improved.data.fps = parseInt(fpsInput.value);
        });
        let startButton = document.querySelector("#startGame");
        startButton.addEventListener("click", StartGame);
    }
    function StartGame() {
        console.log("Heer");
        camera = new Snake3D_Improved.ƒ.ComponentCamera();
        camera.pivot.translateZ(50);
        camera.pivot.rotateY(180);
        graph = new Snake3D_Improved.ƒ.Node("Graph");
        graph.appendChild(CreateLights());
        graph.appendChild(CreateGameField(Snake3D_Improved.data.gameFieldSize));
        const canvas = document.querySelector("canvas");
        viewport = new Snake3D_Improved.ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        viewport.draw();
        gameController = new Snake3D_Improved.GameController(Snake3D_Improved.data.roundTime, Snake3D_Improved.data.nEnemys, graph, viewport);
        gameController.AddElementToPlayerSnake();
        gameController.AddElementToPlayerSnake();
        gameController.AddElementToPlayerSnake();
        gameController.AddElementToPlayerSnake();
        gameController.AddElementToPlayerSnake();
        Snake3D_Improved.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, Update);
        Snake3D_Improved.ƒ.Loop.start(Snake3D_Improved.ƒ.LOOP_MODE.TIME_REAL, Snake3D_Improved.data.fps);
    }
    function Update() {
        if (gameController.IsGameEnded() || gameController.IsGamePaused())
            return;
        gameController.Update();
        viewport.draw();
    }
    function HandleInput(_event) {
        switch (_event.code) {
            case Snake3D_Improved.ƒ.KEYBOARD_CODE.SPACE:
                gameController.PauseGame();
                break;
            case Snake3D_Improved.ƒ.KEYBOARD_CODE.A:
                gameController.TurnPlayerSnakeLeft();
                break;
            case Snake3D_Improved.ƒ.KEYBOARD_CODE.D:
                gameController.TurnPlayerSnakeRight();
                break;
        }
    }
    function CreateGameField(_size) {
        let meshCube = new Snake3D_Improved.ƒ.MeshCube();
        let mtrSolidGray = new Snake3D_Improved.ƒ.Material("SolidGray", Snake3D_Improved.ƒ.ShaderFlat, new Snake3D_Improved.ƒ.CoatColored(Snake3D_Improved.ƒ.Color.CSS("Gray")));
        let gameField = CreateNode("GameField", meshCube, mtrSolidGray, new Snake3D_Improved.ƒ.Vector3(0.5, 0.5, 0.5), _size);
        return gameField;
    }
    function CreateNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new Snake3D_Improved.ƒ.Node(_name);
        node.addComponent(new Snake3D_Improved.ƒ.ComponentTransform);
        node.addComponent(new Snake3D_Improved.ƒ.ComponentMaterial(_material));
        node.addComponent(new Snake3D_Improved.ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation);
        node.getComponent(Snake3D_Improved.ƒ.ComponentMesh).pivot.scale(_scaling);
        return node;
    }
    Snake3D_Improved.CreateNode = CreateNode;
    function CreateLights() {
        let lights = new Snake3D_Improved.ƒ.Node("lights");
        let cmpLightDirectionFront = new Snake3D_Improved.ƒ.ComponentLight(new Snake3D_Improved.ƒ.LightDirectional(new Snake3D_Improved.ƒ.Color(1, 1, 1)));
        cmpLightDirectionFront.pivot.lookAt(new Snake3D_Improved.ƒ.Vector3(-8, -10, 15));
        let cmpLightDirectionBack = new Snake3D_Improved.ƒ.ComponentLight(new Snake3D_Improved.ƒ.LightDirectional(new Snake3D_Improved.ƒ.Color(1, 1, 1)));
        cmpLightDirectionBack.pivot.lookAt(new Snake3D_Improved.ƒ.Vector3(8, 10, -15));
        lights.addComponent(cmpLightDirectionFront);
        lights.addComponent(cmpLightDirectionBack);
        return lights;
    }
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=index.js.map