"use strict";
var TowerDefense;
(function (TowerDefense) {
    class Base {
        constructor() {
            this.tower = [];
            this.baseLife = 250;
            this.baseMoney = 0;
        }
        upgradeTower(_index) {
            this.tower[_index].upgradeTower();
            return false;
        }
        takeMoney(_amount) {
            this.baseMoney += _amount;
        }
        removeMoney(_amount) {
            if (this.baseMoney > _amount) {
                this.baseMoney -= _amount;
                return true;
            }
            return false;
        }
        takeDamage(_amount) {
            this.baseLife -= _amount;
        }
        isBaseAlife() {
            return this.baseLife > 0;
        }
    }
    TowerDefense.Base = Base;
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=Base.js.map