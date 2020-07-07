namespace TowerDefender {
  export class Tower {
    private level: number = 1;
    private damage: number = 1;
    private speed: number = 3;

    public upgrade(): void {
      this.level++;
      this.speed++;
      this.damage *= this.level;
    }

    public rotate(_angle: number): void {
      console.log("Rotate angle: ", _angle);
    }

    public attack(): void {
      console.log("Attack");
    }

    public getLevel(): number {
      return this.level;
    }

    public getDamage(): number {
      return this.damage;
    }

    public getSpeed(): number {
      return this.speed;
    }
  }
}