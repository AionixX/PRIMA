namespace Snake3D_Improved {

  interface Data {
    roundTime: number;
    nEnemys: number;
    fps: number;
    foodAmount: number;
    enemyDetectionRange: number;
    gameFieldSize: ƒ.Vector3;
  }

  export let data: Data = {
    roundTime: 60,
    nEnemys: 1,
    fps: 3,
    foodAmount: 15,
    enemyDetectionRange: 6,
    gameFieldSize: new ƒ.Vector3(20, 20, 20)
  };
}