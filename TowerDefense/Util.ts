namespace TowerDefense {

  export import ƒ = FudgeCore;
  export import ƒAid = FudgeAid;

  export let meshCube: ƒ.Mesh = new ƒ.MeshCube();
  export let mtrFlatGray: ƒ.Material = new ƒ.Material("FlatGray", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("Gray")));
  export let mtrFlatWhite: ƒ.Material = new ƒ.Material("FlatWhite", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("White")));

  export function createNode(_name: string, _mesh: ƒ.Mesh, _material: ƒ.Material, _translation: ƒ.Vector3, _scaling: ƒ.Vector3): ƒ.Node {
    let node: ƒ.Node = new ƒ.Node(_name);
    node.addComponent(new ƒ.ComponentTransform);
    node.addComponent(new ƒ.ComponentMaterial(_material));
    node.addComponent(new ƒ.ComponentMesh(_mesh));
    node.cmpTransform.local.translate(_translation);
    node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling);

    return node;
  }
}