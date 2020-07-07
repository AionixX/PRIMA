"use strict";
var TowerDefense;
(function (TowerDefense) {
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
        camera = new TowerDefense.ƒ.ComponentCamera();
        camera.pivot.translateZ(50);
        camera.pivot.rotateY(180);
        // let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        // cmpCamera.backgroundColor = ƒ.Color.CSS("white");
        // camera = new ƒAid.CameraOrbit(cmpCamera, 50, 75, 3, 20);
        // graph.addChild(camera);
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
        // baseLifeRangeElement = <HTMLInputElement>document.querySelector("input#baseLife");
        // moneySpanElement = <HTMLSpanElement>document.querySelector("span#money");
        // timeSpanElement = <HTMLSpanElement>document.querySelector("span#time");
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
        // let pos: ƒ.Vector2 = viewport.pointClientToProjection(new ƒ.Vector2(_event.pointerX, _event.pointerY));
        let pos = viewport.pointClientToProjection(new TowerDefense.ƒ.Vector2(_event.pointerX, _event.pointerY));
        let ray = new TowerDefense.ƒ.Ray(new TowerDefense.ƒ.Vector3(1, pos.y, -pos.x));
        let camera = viewport.camera;
        ray.direction.scale(50);
        ray.origin.transform(camera.pivot);
        ray.origin.transform(viewport.getGraph().mtxWorld);
        ray.direction.transform(camera.pivot, false);
        ray.direction.transform(viewport.getGraph().mtxWorld, false);
        let rayEnd = TowerDefense.ƒ.Vector3.SUM(ray.origin, ray.direction);
        console.log(rayEnd.x, rayEnd.y, rayEnd.z);
        middleTower.mtxLocal.lookAt(rayEnd);
        // ray.direction.scale(camera.pivot.translation.magnitude);
        // ray.origin.transform(camera.pivot);
        // ray.direction.transform(camera.pivot, false);
        // let rayEnd: ƒ.Vector3 = ƒ.Vector3.SUM(ray.origin, ray.direction);
        // let projection: ƒ.Vector3 = camera.project(rayEnd);
        // // let screen: ƒ.Vector2 = ƒ.RenderManager.rectClip.pointToRect(projection.toVector2(), viewport.getCanvasRectangle());
        // let screen: ƒ.Vector2 = viewport.pointClipToClient(projection.toVector2());
        // console.log(projection.x, projection.y);
        // // middleTower.mtxLocal.lookAt(rayEnd)
        // // middleTower.cmpTransform.local.lookAt(rayEnd);
        // middleTower.mtxLocal.lookAt(new ƒ.Vector3(screen.x, screen.y));
        // let scalar: number = (middleTower.mtxWorld.translation.x * rayEnd.x) + (middleTower.mtxWorld.translation.z * rayEnd.y);
        // let lengthTower: number = Math.sqrt(Math.pow(middleTower.mtxWorld.translation.x, 2) + Math.pow(middleTower.mtxWorld.translation.z, 2));
        // let lengthMouse: number = Math.sqrt(Math.pow(rayEnd.x, 2) + Math.pow(rayEnd.y, 2));
        // let angle: number = Math.acos(scalar / (lengthMouse * lengthTower));
        // // middleTower.mtxLocal.rotation.set(0, 0, angle);
        // middleTower.mtxLocal.rotation = new ƒ.Vector3(0, 0, (angle * (180 / Math.PI)));
    }
    function update() {
        viewport.draw();
    }
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=index.js.map