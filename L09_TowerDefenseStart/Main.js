"use strict";
var L09_TowerDefenseStart;
(function (L09_TowerDefenseStart) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let graph = new ƒ.Node("Graph");
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 10, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("white");
        L09_TowerDefenseStart.viewport = new ƒ.Viewport();
        L09_TowerDefenseStart.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(L09_TowerDefenseStart.viewport);
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        graph.addChild(new ƒAid.NodeCoordinateSystem());
        graph.addChild(new ƒ.Node("Cubes"));
        let mtrWhite = new ƒ.Material("White", ƒ.ShaderFlat, new ƒ.CoatColored());
        let meshCube = new ƒ.MeshCube();
        for (let i = 0; i < 10; i++) {
            let range = 4;
            let pos = new ƒ.Vector3(ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-range, range));
            let cube = new L09_TowerDefenseStart.NodePickable("Cube" + i, ƒ.Matrix4x4.TRANSLATION(pos), mtrWhite, meshCube);
            cube.mtxLocal.scale(ƒ.Vector3.ONE(1));
            graph.getChild(1).addChild(cube);
        }
        L09_TowerDefenseStart.viewport.draw();
        for (let cube of graph.getChild(1).getChildren()) {
            cube.drawPickRadius();
        }
        L09_TowerDefenseStart.viewport.addEventListener("\u0192pointermove" /* MOVE */, pointerMove);
        L09_TowerDefenseStart.viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        // ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    }
    function pointerMove(_event) {
        let posMouse = new ƒ.Vector2(_event.canvasX, _event.canvasY);
        let cubes = L09_TowerDefenseStart.viewport.getGraph().getChild(1).getChildren();
        let picked = [];
        for (let cube of cubes) {
            let pickData = cube.pick(posMouse);
            let cmpMaterial = cube.getComponent(ƒ.ComponentMaterial);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("white");
            if (pickData) {
                cmpMaterial.clrPrimary = ƒ.Color.CSS("red");
                picked.push({ z: pickData.clip.z, cube: cube.name });
            }
        }
        picked.sort((_a, _b) => _a.z > _b.z ? 1 : -1);
        console.clear();
        console.table(picked);
        L09_TowerDefenseStart.viewport.draw();
    }
})(L09_TowerDefenseStart || (L09_TowerDefenseStart = {}));
//# sourceMappingURL=Main.js.map