namespace TowerDefender {
  export class TowerController {
    protected tower: Tower;

    public upgradeTower(): void {
      this.tower.upgrade();
    }

    public rotate(_angle: number): void {
      this.tower.rotate(_angle);
    }

    public attack(): void {
      this.tower.attack();
    }

    public getLevel(): number {
      return this.tower.getLevel();
    }

    public getDamage(): number {
      return this.tower.getDamage();
    }

    public getSpeed(): number {
      return this.tower.getSpeed();
    }
  }
}