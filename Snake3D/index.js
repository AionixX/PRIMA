"use strict";
var Snake3D;
(function (Snake3D) {
    class SnakeElement {
        constructor(elementNode, position, isSnakeHead) {
            this.previousElement = null;
            this.nextElement = null;
            this.isSnakeHead = isSnakeHead;
            this.elementNode = elementNode;
            this.position = position;
        }
    }
    var ƒ = FudgeCore;
    window.addEventListener("load", Init);
    let camera;
    let viewport;
    let gameField;
    let SnakeHead;
    let gameFieldWidth = 20;
    let gameFieldHeight = 20;
    let gameFieldDepth = 20;
    function Init() {
        camera = new ƒ.ComponentCamera();
        camera.pivot.translateZ(50);
        camera.pivot.rotateY(180);
        gameField = CreateGameField();
        const canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", gameField, camera, canvas);
        viewport.draw();
        document.addEventListener("keypress", HandleInput);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, Update);
        ƒ.Loop.start();
    }
    function Update() {
        console.log("Update");
        viewport.draw();
    }
    function HandleInput(_event) {
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
    function AddSnakeElement(element) {
        if (element.nextElement == null) {
            let newElement = CreateSnakeElement(element.position);
            let snakeElement = new SnakeElement(newElement, element.position, false);
            element.nextElement = snakeElement;
            snakeElement.previousElement = element;
        }
        else {
            AddSnakeElement(element.nextElement);
        }
    }
    function CreateSnakeHead() {
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
        let meshSphere = new ƒ.MeshCube;
        let headElement = createNode("SnakeHead", meshSphere, mtrSolidWhite, new ƒ.Vector3(0, 0, 0), new ƒ.Vector3(1, 1, 1));
        let snakeHead = new SnakeElement(headElement, new ƒ.Vector3(0, 0, 0), true);
        return snakeHead;
    }
    function CreateGameField() {
        let gameField = new ƒ.Node("GameField");
        gameField.addComponent(new ƒ.ComponentTransform);
        let mtrSolidGray = new ƒ.Material("SolidGray", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("Gray")));
        let meshQuad = new ƒ.MeshCube;
        for (let x = 0; x < gameFieldWidth; x++) {
            for (let y = 0; y < gameFieldHeight; y++) {
                for (let z = 0; z < gameFieldDepth; z++) {
                    let posX = x - (gameFieldWidth / 2);
                    let posY = y - (gameFieldHeight / 2);
                    let posZ = z - (gameFieldDepth / 2);
                    let cube = createNode("GameCube", meshQuad, mtrSolidGray, new ƒ.Vector3(posX, posY, posZ), new ƒ.Vector3(1, 1, 1));
                    gameField.appendChild(cube);
                }
            }
        }
        return gameField;
    }
    function CreateSnakeElement(position) {
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("White")));
        let meshQuad = new ƒ.MeshCube;
        let element = createNode("SnakeElement", meshQuad, mtrSolidWhite, position, new ƒ.Vector3(1, 1, 1));
        return element;
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