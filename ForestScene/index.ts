namespace ForestScene {

  window.addEventListener("click", init);
  window.addEventListener("keypress", handleKeyPressed);

  import ƒ = FudgeCore;

  let forest: ƒ.Node;
  let viewport: ƒ.Viewport;
  let camera: ƒ.ComponentCamera;
  let cameraPosition: ƒ.Vector3 = new ƒ.Vector3(0, -30, 10);
  let cameraRotation: ƒ.Vector3 = new ƒ.Vector3(-80, 180, 0);

  function init(): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    forest = createForest();

    forest.cmpTransform.local.rotateZ(40);

    camera = new ƒ.ComponentCamera();
    camera.pivot.translate(cameraPosition);
    camera.pivot.rotate(cameraRotation);

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", forest, camera, canvas);
    viewport.draw();

    
  }

  function handleKeyPressed(_event: KeyboardEvent): void {
    switch (_event.key) {
      case "a":
        forest.cmpTransform.local.rotateZ(1);
        break;
      case "d":
        forest.cmpTransform.local.rotateZ(-1);
        break;
      case "w":
        forest.cmpTransform.local.rotateX(-1);
        break;
      case "s":
        forest.cmpTransform.local.rotateX(1);
        break;
    }
    viewport.draw();
  }

  function createForest(): ƒ.Node {
    
    let newForest: ƒ.Node = new ƒ.Node("Forest");
    newForest.addComponent(new ƒ.ComponentTransform);
    newForest.appendChild(createGround(new ƒ.Vector3(20, 20, 1)));
    newForest.appendChild(createTree(new ƒ.Vector3(8, 3, 2), 5, 4));
    newForest.appendChild(createTree(new ƒ.Vector3(-6, 2, 2), 5, 4));
    newForest.appendChild(createTree(new ƒ.Vector3(-3, -1, 2), 5, 4));
    newForest.appendChild(createTree(new ƒ.Vector3(-5, -5, 2), 5, 4));

    return newForest;
  }

  function createTree(_position: ƒ.Vector3, _trunkHeight: number, _leafsSegments: number): ƒ.Node {
    let tree: ƒ.Node = new ƒ.Node("Tree");
    tree.addComponent(new ƒ.ComponentTransform());
    tree.appendChild(createTreeTrunk(_trunkHeight));
    tree.appendChild(createTreeLeafes(_leafsSegments, _trunkHeight));
    tree.cmpTransform.local.translation = _position;

    return tree;
  }

  function createTreeTrunk(_trunkHeight: number): ƒ.Node {
    let mesh: ƒ.MeshCube = new ƒ.MeshCube();
    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
    
    let mtrSolidBrown: ƒ.Material = new ƒ.Material("SolidBrown", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BROWN")));
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidBrown);

    let treeTrunk: ƒ.Node = new ƒ.Node("TreeTrunk");
    treeTrunk.addComponent(new ƒ.ComponentTransform());
    treeTrunk.addComponent(cmpMesh);
    treeTrunk.addComponent(cmpMaterial);
    treeTrunk.getComponent(ƒ.ComponentTransform).local.scaleZ(_trunkHeight);

    return treeTrunk;
  }

  function createTreeLeafes(_leafsSegments: number, _trunkHeight: number): ƒ.Node {
    let leafs: ƒ.Node = new ƒ.Node("Leafs");
    leafs.addComponent(new ƒ.ComponentTransform);

    for (let i: number = _leafsSegments + 1; i > 1; i--) {
      leafs.appendChild(createLeaf(i, _leafsSegments, _trunkHeight));
    }

    return leafs;
  }

  function createLeaf(_segmentNumber: number, _maxSegments: number, _trunkHeight: number): ƒ.Node {
    let mesh: ƒ.MeshPyramid = new ƒ.MeshPyramid();
    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
    
    let mtrSolidDarkGreen: ƒ.Material = new ƒ.Material("SolidDarkGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("DARKGREEN")));
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidDarkGreen);

    let leafSegment: ƒ.Node = new ƒ.Node("LeafSegment");
    leafSegment.addComponent(new ƒ.ComponentTransform());
    leafSegment.addComponent(cmpMesh);
    leafSegment.addComponent(cmpMaterial);
    leafSegment.getComponent(ƒ.ComponentTransform).local.rotateX(90);
    leafSegment.getComponent(ƒ.ComponentTransform).local.translateY(((_maxSegments - _segmentNumber) + (_maxSegments / _segmentNumber)) + (_trunkHeight / 2) - 1);
    leafSegment.getComponent(ƒ.ComponentTransform).local.scale(new ƒ.Vector3(_segmentNumber, _segmentNumber, _segmentNumber));

    return leafSegment;
  }

  function createGround(_size: ƒ.Vector3): ƒ.Node {
    let mesh: ƒ.MeshCube = new ƒ.MeshCube();
    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
    
    let mtrSolidGreen: ƒ.Material = new ƒ.Material("SolidGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")));
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidGreen);

    let ground: ƒ.Node = new ƒ.Node("Ground");
    ground.addComponent(new ƒ.ComponentTransform());
    ground.addComponent(cmpMesh);
    ground.addComponent(cmpMaterial);
    ground.getComponent(ƒ.ComponentTransform).local.scale(_size);

    return ground;
  }
}