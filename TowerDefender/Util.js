"use strict";
var TowerDefender;
(function (TowerDefender) {
    TowerDefender.ƒ = FudgeCore;
    TowerDefender.ƒAid = FudgeAid;
    TowerDefender.meshCube = new TowerDefender.ƒ.MeshCube();
    TowerDefender.mtrFlatGray = new TowerDefender.ƒ.Material("FlatGray", TowerDefender.ƒ.ShaderFlat, new TowerDefender.ƒ.CoatColored(TowerDefender.ƒ.Color.CSS("Gray")));
    TowerDefender.mtrFlatWhite = new TowerDefender.ƒ.Material("FlatWhite", TowerDefender.ƒ.ShaderFlat, new TowerDefender.ƒ.CoatColored(TowerDefender.ƒ.Color.CSS("White")));
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        let node = new TowerDefender.ƒ.Node(_name);
        node.addComponent(new TowerDefender.ƒ.ComponentTransform);
        node.addComponent(new TowerDefender.ƒ.ComponentMaterial(_material));
        node.addComponent(new TowerDefender.ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation);
        node.getComponent(TowerDefender.ƒ.ComponentMesh).pivot.scale(_scaling);
        return node;
    }
    TowerDefender.createNode = createNode;
})(TowerDefender || (TowerDefender = {}));
//# sourceMappingURL=Util.js.map