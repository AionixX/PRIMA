"use strict";
var TowerDefender;
(function (TowerDefender) {
    class Projectile extends TowerDefender.ƒ.Node {
        constructor(_name, _translation, _scaling, _direction, _speed) {
            super(_name);
            this.direction = _direction;
            this.direction.normalize();
            this.speed = _speed;
            this.addComponent(new TowerDefender.ƒ.ComponentTransform);
            this.addComponent(new TowerDefender.ƒ.ComponentMaterial(TowerDefender.mtrFlatGray));
            this.addComponent(new TowerDefender.ƒ.ComponentMesh(TowerDefender.meshCube));
            this.cmpTransform.local.translate(_translation);
            this.getComponent(TowerDefender.ƒ.ComponentMesh).pivot.scale(_scaling);
            TowerDefender.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        update(_event) {
            this.cmpTransform.local.translate(this.direction);
            console.log(this.cmpTransform.local.translation.x, this.cmpTransform.local.translation.y, this.cmpTransform.local.translation.z);
        }
    }
    TowerDefender.Projectile = Projectile;
})(TowerDefender || (TowerDefender = {}));
//# sourceMappingURL=Projectile.js.map