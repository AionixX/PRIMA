namespace TowerDefender {
  export class Projectile extends ƒ.Node {
    direction: ƒ.Vector3;
    speed: number;

    constructor(_name: string, _translation: ƒ.Vector3, _scaling: ƒ.Vector3, _direction: ƒ.Vector3, _speed: number) {
      super(_name);
      this.direction = _direction;
      this.direction.normalize();
      this.speed = _speed;

      this.addComponent(new ƒ.ComponentTransform);
      this.addComponent(new ƒ.ComponentMaterial(mtrFlatGray));
      this.addComponent(new ƒ.ComponentMesh(meshCube));
      this.cmpTransform.local.translate(_translation);
      this.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    update(_event: ƒ.Eventƒ): void {
      this.cmpTransform.local.translate(this.direction);
      console.log(this.cmpTransform.local.translation.x, this.cmpTransform.local.translation.y, this.cmpTransform.local.translation.z);
    }
  }
}