"use strict";
var TowerDefense;
(function (TowerDefense) {
    TowerDefense.ƒ = FudgeCore;
    TowerDefense.ƒAid = FudgeAid;
    TowerDefense.meshCube = new TowerDefense.ƒ.MeshCube();
    TowerDefense.mtrFlatGray = new TowerDefense.ƒ.Material("FlatGray", TowerDefense.ƒ.ShaderFlat, new TowerDefense.ƒ.CoatColored(TowerDefense.ƒ.Color.CSS("Gray")));
    TowerDefense.mtrFlatWhite = new TowerDefense.ƒ.Material("FlatWhite", TowerDefense.ƒ.ShaderFlat, new TowerDefense.ƒ.CoatColored(TowerDefense.ƒ.Color.CSS("White")));
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new TowerDefense.ƒ.Node(_name);
        node.addComponent(new TowerDefense.ƒ.ComponentTransform);
        node.addComponent(new TowerDefense.ƒ.ComponentMaterial(_material));
        node.addComponent(new TowerDefense.ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation);
        node.getComponent(TowerDefense.ƒ.ComponentMesh).pivot.scale(_scaling);
        return node;
    }
    TowerDefense.createNode = createNode;
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=Util.js.map