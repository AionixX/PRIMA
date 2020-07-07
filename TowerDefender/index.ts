namespace TowerDefender {
  //export import ƒ = FudgeCore;

  window.addEventListener("load", init);

  // let baseLifeRangeElement: HTMLInputElement;
  // let moneySpanElement: HTMLSpanElement;
  // let timeSpanElement: HTMLSpanElement;

  let canvas: HTMLCanvasElement;
  let camera: ƒ.ComponentCamera
  let viewport: ƒ.Viewport;

  let graph: ƒ.Node;
  let upperTower: ƒ.Node;
  let middleTower: ƒ.Node;
  let lowerTower: ƒ.Node;

  function init(): void {
    getReferences();

    camera = new ƒ.ComponentCamera();
    camera.pivot.translateY(50);
    camera.pivot.rotateX(90);
    camera.pivot.rotateZ(180);

    // let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    // cmpCamera.backgroundColor = ƒ.Color.CSS("white");
    // camera = new ƒAid.CameraOrbit(cmpCamera, 50, 75, 3, 20);
    // graph.addChild(camera);

    graph = new ƒ.Node("Graph");
    graph.appendChild(createGameField());
    graph.appendChild(createBase());

    ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));

    canvas = document.querySelector("canvas");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, camera, canvas);
    viewport.draw();

    viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, mouseMove);
    viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);

    viewport.addEventListener(ƒ.EVENT_POINTER.UP, mouseClick);
    viewport.activatePointerEvent(ƒ.EVENT_POINTER.UP, true);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 10);
  }


  function getReferences(): void {
    // baseLifeRangeElement = <HTMLInputElement>document.querySelector("input#baseLife");
    // moneySpanElement = <HTMLSpanElement>document.querySelector("span#money");
    // timeSpanElement = <HTMLSpanElement>document.querySelector("span#time");
  }

  function createGameField(): ƒ.Node {
    let field: ƒ.Node = createNode("GameField", meshCube, mtrFlatGray, ƒ.Vector3.X(8), data.gameFieldSize);
    field.appendChild(createWalls());
    return field;
  }

  function createWalls(): ƒ.Node {
    let walls: ƒ.Node = new ƒ.Node("Walls");

    let posTop: ƒ.Vector3 = new ƒ.Vector3(0, 2, -data.gameFieldSize.z / 2 + 0.5);
    let posBottom: ƒ.Vector3 = new ƒ.Vector3(0, 2, data.gameFieldSize.z / 2 - 0.5);
    let posLeft: ƒ.Vector3 = new ƒ.Vector3(-data.gameFieldSize.x / 2 + 2, 2, 0);

    let scaleHorizontal: ƒ.Vector3 = new ƒ.Vector3(data.gameFieldSize.x, 1, 4);
    let scaleVertical: ƒ.Vector3 = new ƒ.Vector3(4, 1, data.gameFieldSize.z);

    let wallTop: ƒ.Node = createNode("WallTop", meshCube, mtrFlatWhite, posTop, scaleHorizontal);
    let wallBottom: ƒ.Node = createNode("wallBottom", meshCube, mtrFlatWhite, posBottom, scaleHorizontal);
    let wallLeft: ƒ.Node = createNode("wallLeft", meshCube, mtrFlatWhite, posLeft, scaleVertical);

    walls.appendChild(wallTop);
    walls.appendChild(wallBottom);
    walls.appendChild(wallLeft);
    return walls;
  }

  function createBase(): ƒ.Node {
    let posBase: ƒ.Vector3 = new ƒ.Vector3(-(data.gameFieldSize.x / 2) + (data.baseSize.x / 2 + 12), 1, 0);
    let base: ƒ.Node = createNode("Base", meshCube, mtrFlatWhite, posBase, data.baseSize);

    upperTower = createTower(new ƒ.Vector3(0, 1, -(data.gameFieldSize.z / 2) + 5), 3);
    middleTower = createTower(ƒ.Vector3.Y(), 5);
    lowerTower = createTower(new ƒ.Vector3(0, 1, (data.gameFieldSize.z / 2) - 5), 3);

    base.appendChild(upperTower);
    base.appendChild(middleTower);
    base.appendChild(lowerTower);

    return base;
  }

  function createTower(_position: ƒ.Vector3, _size: number): ƒ.Node {
    let tower: ƒ.Node = createNode("Tower", meshCube, mtrFlatGray, _position, ƒ.Vector3.ONE(_size));
    tower.addChild(new ƒAid.NodeCoordinateSystem());
    let barrel: ƒ.Node = createNode("Barrel", meshCube, mtrFlatGray, new ƒ.Vector3(0, (1 / 5) * _size, (3 / 5) * _size), new ƒ.Vector3(1, 1, (3 / 5) * _size));

    tower.appendChild(barrel);
    return tower;
  }

  function mouseClick(_event: ƒ.EventPointer): void {
    let pos: ƒ.Vector3 = convertClientToView(new ƒ.Vector2(_event.pointerX, _event.pointerY))
    let direction: ƒ.Vector3 = middleTower.cmpTransform.local.translation.copy;
    direction.add(pos);

    let projectile: Projectile = new Projectile("Projectile", middleTower.mtxWorld.translation, ƒ.Vector3.ONE(), direction, 1);
    graph.appendChild(projectile);
    console.log(direction.x, direction.y, direction.z);
  }
  function mouseMove(_event: ƒ.EventPointer): void {
    let pos: ƒ.Vector3 = convertClientToView(new ƒ.Vector2(_event.pointerX, _event.pointerY))
    middleTower.mtxLocal.lookAt(pos);
  }

  function convertClientToView(_mousepos: ƒ.Vector2): ƒ.Vector3 {
    let posProjection: ƒ.Vector2 = viewport.pointClientToProjection(_mousepos);
    let ray: ƒ.Ray = new ƒ.Ray(new ƒ.Vector3(-posProjection.x, posProjection.y, 1));
    let camera: ƒ.ComponentCamera = viewport.camera;

    ray.direction.scale(49);
    ray.origin.transform(camera.pivot);
    ray.origin.transform(viewport.getGraph().mtxWorld);
    ray.direction.transform(camera.pivot, false);
    ray.direction.transform(viewport.getGraph().mtxWorld, false);

    let rayEnd: ƒ.Vector3 = ƒ.Vector3.SUM(ray.origin, ray.direction);
    rayEnd.add(new ƒ.Vector3((data.gameFieldSize.x / 2) - (data.baseSize.x / 2 + 8)));
    return rayEnd;
}

  function update(): void {
    viewport.draw();
  }
}