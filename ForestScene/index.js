"use strict";
var ForestScene;
(function (ForestScene) {
    window.addEventListener("load", init);
    window.addEventListener("keypress", handleKeyPressed);
    var ƒ = FudgeCore;
    let forest;
    let viewport;
    let camera;
    let cameraPosition = new ƒ.Vector3(0, -30, 10);
    let cameraRotation = new ƒ.Vector3(-80, 180, 0);
    function init() {
        const canvas = document.querySelector("canvas");
        forest = createForest();
        forest.cmpTransform.local.rotateZ(40);
        camera = new ƒ.ComponentCamera();
        camera.pivot.translate(cameraPosition);
        camera.pivot.rotate(cameraRotation);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", forest, camera, canvas);
        viewport.draw();
    }
    function handleKeyPressed(_event) {
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
    function createForest() {
        let newForest = new ƒ.Node("Forest");
        newForest.addComponent(new ƒ.ComponentTransform);
        newForest.appendChild(createGround(new ƒ.Vector3(20, 20, 1)));
        newForest.appendChild(createRandomForest());
        return newForest;
    }
    function createRandomForest() {
        let forest = new ƒ.Node("RandForest");
        let randomTreeCount = Math.random() * 10;
        for (let i = 0; i < randomTreeCount; i++) {
            let randomX = (Math.random() * 18) - 9;
            let randomY = (Math.random() * 18) - 9;
            let randomHeight = (Math.random() * 3) + 2;
            let randomLeafs = (Math.random() * 3) + 2;
            let newTree = createTree(new ƒ.Vector3(randomX, randomY, 2), randomHeight, randomLeafs);
            forest.appendChild(newTree);
        }
        let randomMushroomCount = Math.random() * 5;
        for (let i = 0; i < randomMushroomCount; i++) {
            let rndX = Math.random() * 18 - 9;
            let rndY = Math.random() * 18 - 9;
            forest.appendChild(createMushroomCluster(new ƒ.Vector3(rndX, rndY, 2)));
        }
        return forest;
    }
    function createMushroomCluster(position) {
        let cluster = new ƒ.Node("MushroomCluster");
        let rnd = Math.random() * 5;
        for (let i = 0; i < rnd; i++) {
            let rndX = Math.random() * 4 - 2;
            let rndY = Math.random() * 4 - 2;
            let rndHeight = Math.random() + 0.2;
            let rndWidth = Math.random() * 0.6 + 0.2;
            cluster.appendChild(createMushroom(rndHeight, rndWidth, new ƒ.Vector3(position.x - rndX, position.y - rndY, rndHeight / 2)));
        }
        return cluster;
    }
    function createMushroom(height, width, position) {
        let mesh = new ƒ.MeshCube();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        let mushroomTrunk = new ƒ.Node("MushroomTrunk");
        mushroomTrunk.addComponent(new ƒ.ComponentTransform());
        mushroomTrunk.addComponent(cmpMesh);
        mushroomTrunk.addComponent(cmpMaterial);
        mushroomTrunk.getComponent(ƒ.ComponentTransform).local.scale(new ƒ.Vector3(width, width, height));
        mushroomTrunk.cmpTransform.local.translation = position;
        mushroomTrunk.cmpTransform.local.translateZ(height / 2);
        let meshHead = new ƒ.MeshCube();
        let cmpMeshHead = new ƒ.ComponentMesh(meshHead);
        let mtrSolidRed = new ƒ.Material("SolidRed", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")));
        let cmpMaterialWhite = new ƒ.ComponentMaterial(mtrSolidRed);
        let mushroomHead = new ƒ.Node("MushroomTrunk");
        mushroomHead.addComponent(new ƒ.ComponentTransform());
        mushroomHead.addComponent(cmpMeshHead);
        mushroomHead.addComponent(cmpMaterialWhite);
        mushroomHead.getComponent(ƒ.ComponentTransform).local.scale(new ƒ.Vector3(1.3 * width, 1.3 * width, 1.3 * width));
        mushroomHead.cmpTransform.local.translation = position;
        mushroomHead.cmpTransform.local.translateZ(height + (width / 2));
        let mushroom = new ƒ.Node("Mushroom");
        mushroom.appendChild(mushroomTrunk);
        mushroom.appendChild(mushroomHead);
        return mushroom;
    }
    function createTree(_position, _trunkHeight, _leafsSegments) {
        let tree = new ƒ.Node("Tree");
        tree.addComponent(new ƒ.ComponentTransform());
        tree.appendChild(createTreeTrunk(_trunkHeight));
        tree.appendChild(createTreeLeafes(_leafsSegments, _trunkHeight));
        tree.cmpTransform.local.translation = _position;
        return tree;
    }
    function createTreeTrunk(_trunkHeight) {
        let mesh = new ƒ.MeshCube();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        let mtrSolidBrown = new ƒ.Material("SolidBrown", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BROWN")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidBrown);
        let treeTrunk = new ƒ.Node("TreeTrunk");
        treeTrunk.addComponent(new ƒ.ComponentTransform());
        treeTrunk.addComponent(cmpMesh);
        treeTrunk.addComponent(cmpMaterial);
        treeTrunk.getComponent(ƒ.ComponentTransform).local.scaleZ(_trunkHeight);
        return treeTrunk;
    }
    function createTreeLeafes(_leafsSegments, _trunkHeight) {
        let leafs = new ƒ.Node("Leafs");
        leafs.addComponent(new ƒ.ComponentTransform);
        for (let i = _leafsSegments + 1; i > 1; i--) {
            leafs.appendChild(createLeaf(i, _leafsSegments, _trunkHeight));
        }
        return leafs;
    }
    function createLeaf(_segmentNumber, _maxSegments, _trunkHeight) {
        let mesh = new ƒ.MeshPyramid();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        let mtrSolidDarkGreen = new ƒ.Material("SolidDarkGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("DARKGREEN")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidDarkGreen);
        let leafSegment = new ƒ.Node("LeafSegment");
        leafSegment.addComponent(new ƒ.ComponentTransform());
        leafSegment.addComponent(cmpMesh);
        leafSegment.addComponent(cmpMaterial);
        leafSegment.getComponent(ƒ.ComponentTransform).local.rotateX(90);
        leafSegment.getComponent(ƒ.ComponentTransform).local.translateY(((_maxSegments / _segmentNumber - 1) * (2 * _segmentNumber)) + (_trunkHeight));
        leafSegment.getComponent(ƒ.ComponentTransform).local.scale(new ƒ.Vector3(_segmentNumber, _segmentNumber, _segmentNumber));
        return leafSegment;
    }
    function createGround(_size) {
        let mesh = new ƒ.MeshCube();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        let mtrSolidGreen = new ƒ.Material("SolidGreen", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidGreen);
        let ground = new ƒ.Node("Ground");
        ground.addComponent(new ƒ.ComponentTransform());
        ground.addComponent(cmpMesh);
        ground.addComponent(cmpMaterial);
        ground.getComponent(ƒ.ComponentTransform).local.scale(_size);
        return ground;
    }
})(ForestScene || (ForestScene = {}));
//# sourceMappingURL=index.js.map