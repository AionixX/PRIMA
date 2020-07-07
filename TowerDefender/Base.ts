namespace TowerDefender {
  export class Base {
    private tower: TowerController[] = [];
    private baseLife: number = 250;
    private baseMoney: number = 0;

    public upgradeTower(_index: number): boolean {
      this.tower[_index].upgradeTower();
      return false;
    }

    public takeMoney(_amount: number): void {
      this.baseMoney += _amount;
    }

    public removeMoney(_amount: number): boolean {
      if (this.baseMoney > _amount) {
        this.baseMoney -= _amount;
        return true;
      }

      return false;
    }

    public takeDamage(_amount: number): void {
      this.baseLife -= _amount;
    }

    public isBaseAlife(): boolean {
      return this.baseLife > 0;
    }
  }
}