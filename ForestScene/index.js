"use strict";
var ForestScene;
(function (ForestScene) {
    window.addEventListener("click", init);
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
    function createForest() {
        let newForest = new ƒ.Node("Forest");
        newForest.addComponent(new ƒ.ComponentTransform);
        newForest.appendChild(createGround(new ƒ.Vector3(20, 20, 1)));
        newForest.appendChild(createTree(new ƒ.Vector3(8, 3, 2), 5, 4));
        newForest.appendChild(createTree(new ƒ.Vector3(-6, 2, 2), 5, 4));
        newForest.appendChild(createTree(new ƒ.Vector3(-3, -1, 2), 5, 4));
        newForest.appendChild(createTree(new ƒ.Vector3(-5, -5, 2), 5, 4));
        return newForest;
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
        leafSegment.getComponent(ƒ.ComponentTransform).local.translateY(((_maxSegments - _segmentNumber) + (_maxSegments / _segmentNumber)) + (_trunkHeight / 2) - 1);
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