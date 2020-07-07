"use strict";
var TowerDefender;
(function (TowerDefender) {
    //export import ƒ = FudgeCore;
    window.addEventListener("load", init);
    // let baseLifeRangeElement: HTMLInputElement;
    // let moneySpanElement: HTMLSpanElement;
    // let timeSpanElement: HTMLSpanElement;
    let canvas;
    let camera;
    let viewport;
    let graph;
    let upperTower;
    let middleTower;
    let lowerTower;
    function init() {
        getReferences();
        camera = new TowerDefender.ƒ.ComponentCamera();
        camera.pivot.translateY(50);
        camera.pivot.rotateX(90);
        camera.pivot.rotateZ(180);
        // let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        // cmpCamera.backgroundColor = ƒ.Color.CSS("white");
        // camera = new ƒAid.CameraOrbit(cmpCamera, 50, 75, 3, 20);
        // graph.addChild(camera);
        graph = new TowerDefender.ƒ.Node("Graph");
        graph.appendChild(createGameField());
        graph.appendChild(createBase());
        TowerDefender.ƒAid.addStandardLightComponents(graph, new TowerDefender.ƒ.Color(0.5, 0.5, 0.5));
        canvas = document.querySelector("canvas");
        viewport = new TowerDefender.ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        viewport.draw();
        viewport.addEventListener("\u0192pointermove" /* MOVE */, mouseMove);
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.addEventListener("\u0192pointerup" /* UP */, mouseClick);
        viewport.activatePointerEvent("\u0192pointerup" /* UP */, true);
        TowerDefender.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        TowerDefender.ƒ.Loop.start(TowerDefender.ƒ.LOOP_MODE.TIME_REAL, 10);
    }
    function getReferences() {
        // baseLifeRangeElement = <HTMLInputElement>document.querySelector("input#baseLife");
        // moneySpanElement = <HTMLSpanElement>document.querySelector("span#money");
        // timeSpanElement = <HTMLSpanElement>document.querySelector("span#time");
    }
    function createGameField() {
        let field = TowerDefender.createNode("GameField", TowerDefender.meshCube, TowerDefender.mtrFlatGray, TowerDefender.ƒ.Vector3.X(8), TowerDefender.data.gameFieldSize);
        field.appendChild(createWalls());
        return field;
    }
    function createWalls() {
        let walls = new TowerDefender.ƒ.Node("Walls");
        let posTop = new TowerDefender.ƒ.Vector3(0, 2, -TowerDefender.data.gameFieldSize.z / 2 + 0.5);
        let posBottom = new TowerDefender.ƒ.Vector3(0, 2, TowerDefender.data.gameFieldSize.z / 2 - 0.5);
        let posLeft = new TowerDefender.ƒ.Vector3(-TowerDefender.data.gameFieldSize.x / 2 + 2, 2, 0);
        let scaleHorizontal = new TowerDefender.ƒ.Vector3(TowerDefender.data.gameFieldSize.x, 1, 4);
        let scaleVertical = new TowerDefender.ƒ.Vector3(4, 1, TowerDefender.data.gameFieldSize.z);
        let wallTop = TowerDefender.createNode("WallTop", TowerDefender.meshCube, TowerDefender.mtrFlatWhite, posTop, scaleHorizontal);
        let wallBottom = TowerDefender.createNode("wallBottom", TowerDefender.meshCube, TowerDefender.mtrFlatWhite, posBottom, scaleHorizontal);
        let wallLeft = TowerDefender.createNode("wallLeft", TowerDefender.meshCube, TowerDefender.mtrFlatWhite, posLeft, scaleVertical);
        walls.appendChild(wallTop);
        walls.appendChild(wallBottom);
        walls.appendChild(wallLeft);
        return walls;
    }
    function createBase() {
        let posBase = new TowerDefender.ƒ.Vector3(-(TowerDefender.data.gameFieldSize.x / 2) + (TowerDefender.data.baseSize.x / 2 + 12), 1, 0);
        let base = TowerDefender.createNode("Base", TowerDefender.meshCube, TowerDefender.mtrFlatWhite, posBase, TowerDefender.data.baseSize);
        upperTower = createTower(new TowerDefender.ƒ.Vector3(0, 1, -(TowerDefender.data.gameFieldSize.z / 2) + 5), 3);
        middleTower = createTower(TowerDefender.ƒ.Vector3.Y(), 5);
        lowerTower = createTower(new TowerDefender.ƒ.Vector3(0, 1, (TowerDefender.data.gameFieldSize.z / 2) - 5), 3);
        base.appendChild(upperTower);
        base.appendChild(middleTower);
        base.appendChild(lowerTower);
        return base;
    }
    function createTower(_position, _size) {
        let tower = TowerDefender.createNode("Tower", TowerDefender.meshCube, TowerDefender.mtrFlatGray, _position, TowerDefender.ƒ.Vector3.ONE(_size));
        tower.addChild(new TowerDefender.ƒAid.NodeCoordinateSystem());
        let barrel = TowerDefender.createNode("Barrel", TowerDefender.meshCube, TowerDefender.mtrFlatGray, new TowerDefender.ƒ.Vector3(0, (1 / 5) * _size, (3 / 5) * _size), new TowerDefender.ƒ.Vector3(1, 1, (3 / 5) * _size));
        tower.appendChild(barrel);
        return tower;
    }
    function mouseClick(_event) {
        let pos = convertClientToView(new TowerDefender.ƒ.Vector2(_event.pointerX, _event.pointerY));
        let direction = middleTower.cmpTransform.local.translation.copy;
        direction.add(pos);
        let projectile = new TowerDefender.Projectile("Projectile", middleTower.mtxWorld.translation, TowerDefender.ƒ.Vector3.ONE(), direction, 1);
        graph.appendChild(projectile);
        console.log(direction.x, direction.y, direction.z);
    }
    function mouseMove(_event) {
        let pos = convertClientToView(new TowerDefender.ƒ.Vector2(_event.pointerX, _event.pointerY));
        middleTower.mtxLocal.lookAt(pos);
    }
    function convertClientToView(_mousepos) {
        let posProjection = viewport.pointClientToProjection(_mousepos);
        let ray = new TowerDefender.ƒ.Ray(new TowerDefender.ƒ.Vector3(-posProjection.x, posProjection.y, 1));
        let camera = viewport.camera;
        ray.direction.scale(49);
        ray.origin.transform(camera.pivot);
        ray.origin.transform(viewport.getGraph().mtxWorld);
        ray.direction.transform(camera.pivot, false);
        ray.direction.transform(viewport.getGraph().mtxWorld, false);
        let rayEnd = TowerDefender.ƒ.Vector3.SUM(ray.origin, ray.direction);
        rayEnd.add(new TowerDefender.ƒ.Vector3((TowerDefender.data.gameFieldSize.x / 2) - (TowerDefender.data.baseSize.x / 2 + 8)));
        return rayEnd;
    }
    function update() {
        viewport.draw();
    }
})(TowerDefender || (TowerDefender = {}));
//# sourceMappingURL=index.js.map