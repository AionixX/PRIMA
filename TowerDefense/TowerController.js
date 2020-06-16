"use strict";
var TowerDefense;
(function (TowerDefense) {
    class TowerController {
        upgradeTower() {
            this.tower.upgrade();
        }
        rotate(_angle) {
            this.tower.rotate(_angle);
        }
        attack() {
            this.tower.attack();
        }
        getLevel() {
            return this.tower.getLevel();
        }
        getDamage() {
            return this.tower.getDamage();
        }
        getSpeed() {
            return this.tower.getSpeed();
        }
    }
    TowerDefense.TowerController = TowerController;
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=TowerController.js.map