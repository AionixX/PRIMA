"use strict";
var TowerDefense;
(function (TowerDefense) {
    //export import ƒ = FudgeCore;
    window.addEventListener("load", init);
    let baseLifeRangeElement;
    let moneySpanElement;
    let timeSpanElement;
    let canvas;
    let camera;
    let viewport;
    let graph;
    let upperTower;
    let middleTower;
    let lowerTower;
    function init() {
        console.log("Here");
        getReferences();
        camera = new TowerDefense.ƒ.ComponentCamera();
        camera.pivot.translateZ(50);
        camera.pivot.rotateY(180);
        graph = new TowerDefense.ƒ.Node("Graph");
        graph.appendChild(createGameField());
        graph.appendChild(createBase());
        TowerDefense.ƒAid.addStandardLightComponents(graph, new TowerDefense.ƒ.Color(0.5, 0.5, 0.5));
        canvas = document.querySelector("canvas");
        viewport = new TowerDefense.ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        viewport.draw();
        viewport.addEventListener("\u0192pointermove" /* MOVE */, mouseMove);
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        TowerDefense.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        TowerDefense.ƒ.Loop.start(TowerDefense.ƒ.LOOP_MODE.TIME_REAL, 10);
    }
    function getReferences() {
        baseLifeRangeElement = document.querySelector("input#baseLife");
        moneySpanElement = document.querySelector("span#money");
        timeSpanElement = document.querySelector("span#time");
    }
    function createGameField() {
        let field = TowerDefense.createNode("GameField", TowerDefense.meshCube, TowerDefense.mtrFlatGray, TowerDefense.ƒ.Vector3.X(8), TowerDefense.data.gameFieldSize);
        field.appendChild(createWalls());
        return field;
    }
    function createWalls() {
        let walls = new TowerDefense.ƒ.Node("Walls");
        let posTop = new TowerDefense.ƒ.Vector3(0, TowerDefense.data.gameFieldSize.y / 2 - 0.5, 1);
        let posBottom = new TowerDefense.ƒ.Vector3(0, -TowerDefense.data.gameFieldSize.y / 2 + 0.5, 1);
        let posLeft = new TowerDefense.ƒ.Vector3(-TowerDefense.data.gameFieldSize.x / 2, 0, 1);
        let scaleHorizontal = new TowerDefense.ƒ.Vector3(TowerDefense.data.gameFieldSize.x, 1, 4);
        let scaleVertical = new TowerDefense.ƒ.Vector3(1, TowerDefense.data.gameFieldSize.y, 4);
        let wallTop = TowerDefense.createNode("WallTop", TowerDefense.meshCube, TowerDefense.mtrFlatWhite, posTop, scaleHorizontal);
        let wallBottom = TowerDefense.createNode("wallBottom", TowerDefense.meshCube, TowerDefense.mtrFlatWhite, posBottom, scaleHorizontal);
        let wallLeft = TowerDefense.createNode("wallLeft", TowerDefense.meshCube, TowerDefense.mtrFlatWhite, posLeft, scaleVertical);
        walls.appendChild(wallTop);
        walls.appendChild(wallBottom);
        walls.appendChild(wallLeft);
        return walls;
    }
    function createBase() {
        let posBase = new TowerDefense.ƒ.Vector3(-(TowerDefense.data.gameFieldSize.x / 2) + (TowerDefense.data.baseSize.x / 2 + 8), 0, 1);
        let base = TowerDefense.createNode("Base", TowerDefense.meshCube, TowerDefense.mtrFlatWhite, posBase, TowerDefense.data.baseSize);
        upperTower = createTower(new TowerDefense.ƒ.Vector3(0, (TowerDefense.data.gameFieldSize.y / 2) - 5, 1), 3);
        middleTower = createTower(TowerDefense.ƒ.Vector3.Z(), 5);
        lowerTower = createTower(new TowerDefense.ƒ.Vector3(0, -(TowerDefense.data.gameFieldSize.y / 2) + 5, 1), 3);
        base.appendChild(upperTower);
        base.appendChild(middleTower);
        base.appendChild(lowerTower);
        return base;
    }
    function createTower(_position, _size) {
        let tower = TowerDefense.createNode("Tower", TowerDefense.meshCube, TowerDefense.mtrFlatGray, _position, TowerDefense.ƒ.Vector3.ONE(_size));
        tower.addChild(new TowerDefense.ƒAid.NodeCoordinateSystem());
        let barrel = TowerDefense.createNode("Barrel", TowerDefense.meshCube, TowerDefense.mtrFlatGray, new TowerDefense.ƒ.Vector3((3 / 5) * _size, 0, (1 / 5) * _size), new TowerDefense.ƒ.Vector3((3 / 5) * _size, 1, 1));
        tower.appendChild(barrel);
        return tower;
    }
    function mouseMove(_event) {
        // middleTower.mtxLocal.lookAt(new ƒ.Vector3(_event.canvasY, _event.canvasX, middleTower.mtxLocal.translation.z));
        // angle = acos((posTower * posMouse) / (|posTower * posMouse|))
        let scalar = (middleTower.mtxWorld.translation.x * _event.pointerX) + (middleTower.mtxWorld.translation.z * _event.pointerY);
        let lengthTower = Math.sqrt(Math.pow(middleTower.mtxWorld.translation.x, 2) + Math.pow(middleTower.mtxWorld.translation.z, 2));
        let lengthMouse = Math.sqrt(Math.pow(_event.pointerX, 2) + Math.pow(_event.pointerY, 2));
        let angle = Math.acos(scalar / (lengthMouse * lengthTower));
        console.log(angle);
        // middleTower.mtxLocal.rotation.set(0, 0, angle);
        middleTower.mtxLocal.rotation = new TowerDefense.ƒ.Vector3(0, 0, (angle * (180 / Math.PI) - 135));
    }
    function update() {
        console.log("Update");
        viewport.draw();
    }
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=index.js.map