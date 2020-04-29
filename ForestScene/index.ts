namespace ForestScene {

  window.addEventListener("load", init);
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
        viewport.draw();
        break;
      case "d":
        forest.cmpTransform.local.rotateZ(-1);
        viewport.draw();
        break;
      case "w":
        forest.cmpTransform.local.rotateX(-1);
        viewport.draw();
        break;
      case "s":
        forest.cmpTransform.local.rotateX(1);
        viewport.draw();
        break;
      case " ":
        init();
        break;
    }
  }

  function createForest(): ƒ.Node {
    
    let newForest: ƒ.Node = new ƒ.Node("Forest");
    newForest.addComponent(new ƒ.ComponentTransform);
    newForest.appendChild(createGround(new ƒ.Vector3(20, 20, 1)));
    newForest.appendChild(createRandomForest());
    return newForest;
  }
  function createRandomForest(): ƒ.Node {
    let forest: ƒ.Node = new ƒ.Node("RandForest");
    let randomTreeCount: number = Math.random() * 10;
    for (let i: number = 0; i < randomTreeCount; i++) {
      let randomX: number = (Math.random() * 18) - 9;
      let randomY: number = (Math.random() * 18) - 9;
      let randomHeight: number = (Math.random() * 3) + 2;
      let randomLeafs: number = (Math.random() * 3) + 2;
      let newTree: ƒ.Node = createTree(new ƒ.Vector3(randomX, randomY, 2), randomHeight, randomLeafs);
      forest.appendChild(newTree);
    }
    let randomMushroomCount: number = Math.random() * 5;
    for (let i: number = 0; i < randomMushroomCount; i++) {
      let rndX: number = Math.random() * 18 - 9;
      let rndY: number = Math.random() * 18 - 9;
      forest.appendChild(createMushroomCluster(new ƒ.Vector3(rndX, rndY, 2)));
    }
    return forest;
  }
  
  function createMushroomCluster(position: ƒ.Vector3): ƒ.Node {
    let cluster: ƒ.Node = new ƒ.Node("MushroomCluster");
    let rnd: number = Math.random() * 5;
    for (let i: number = 0; i < rnd; i++) {
      let rndX: number = Math.random() * 4 - 2;
      let rndY: number = Math.random() * 4 - 2;
      let rndHeight: number = Math.random() + 0.2;
      let rndWidth: number = Math.random() * 0.6 + 0.2;
      cluster.appendChild(createMushroom(rndHeight, rndWidth, new ƒ.Vector3(position.x - rndX, position.y - rndY, rndHeight / 2)));
    }
    return cluster;
  }
  function createMushroom(height: number, width: number, position: ƒ.Vector3): ƒ.Node {
    let mesh: ƒ.MeshCube = new ƒ.MeshCube();
    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
    
    let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);

    
    let mushroomTrunk: ƒ.Node = new ƒ.Node("MushroomTrunk");
    mushroomTrunk.addComponent(new ƒ.ComponentTransform());
    mushroomTrunk.addComponent(cmpMesh);
    mushroomTrunk.addComponent(cmpMaterial);
    mushroomTrunk.getComponent(ƒ.ComponentTransform).local.scale(new ƒ.Vector3(width, width, height));
    mushroomTrunk.cmpTransform.local.translation = position;
    mushroomTrunk.cmpTransform.local.translateZ(height / 2);
    
    let meshHead: ƒ.MeshCube = new ƒ.MeshCube();
    let cmpMeshHead: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshHead);
    
    let mtrSolidRed: ƒ.Material = new ƒ.Material("SolidRed", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));
    let cmpMaterialWhite: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrSolidRed);
    
    let mushroomHead: ƒ.Node = new ƒ.Node("MushroomTrunk");
    mushroomHead.addComponent(new ƒ.ComponentTransform());
    mushroomHead.addComponent(cmpMeshHead);
    mushroomHead.addComponent(cmpMaterialWhite);
    mushroomHead.getComponent(ƒ.ComponentTransform).local.scale(new ƒ.Vector3(1.3 * width, 1.3 * width, 1.3 * width));
    mushroomHead.cmpTransform.local.translation = position;
    mushroomHead.cmpTransform.local.translateZ(height + (width / 2));
    
    
    let mushroom: ƒ.Node = new ƒ.Node("Mushroom");
    mushroom.appendChild(mushroomTrunk);
    mushroom.appendChild(mushroomHead);

    return mushroom;

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
    leafSegment.getComponent(ƒ.ComponentTransform).local.translateY(((_maxSegments / _segmentNumber - 1) * (2 * _segmentNumber)) + (_trunkHeight));
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