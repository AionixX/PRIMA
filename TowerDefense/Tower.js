"use strict";
var TowerDefense;
(function (TowerDefense) {
    class Tower {
        constructor() {
            this.level = 1;
            this.damage = 1;
            this.speed = 3;
        }
        upgrade() {
            this.level++;
            this.speed++;
            this.damage *= this.level;
        }
        rotate(_angle) {
            console.log("Rotate angle: ", _angle);
        }
        attack() {
            console.log("Attack");
        }
        getLevel() {
            return this.level;
        }
        getDamage() {
            return this.damage;
        }
        getSpeed() {
            return this.speed;
        }
    }
    TowerDefense.Tower = Tower;
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=Tower.js.map