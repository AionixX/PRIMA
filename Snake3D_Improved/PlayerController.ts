namespace Snake3D_Improved {
  export class PlayerController extends Controller {
    private gamePaused: boolean;
    private gameEnded: boolean;

    constructor(_name: string, _snake: Snake) {
      super(_name, _snake);
      this.gameEnded = false;
      this.gamePaused = false;
      document.addEventListener("keydown", this.HandleInput);
    }

    public Update(): void {
      console.log("Hello");
      this.snake.Move();
    }
    public HandleInput(_event: KeyboardEvent): void {
      let self = this;
      console.log("event");
      switch (_event.code) {
        case ƒ.KEYBOARD_CODE.SPACE:
          console.log(this.gamePaused);
          self.PauseGame();
          console.log(this.gamePaused);
          console.log("______________");
          break;
        case ƒ.KEYBOARD_CODE.A:
          this.snake.Rotate(ƒ.Vector3.Z(90));
          break;
      }
    }
    public PauseGame(): void {
      this.gamePaused = !this.gamePaused;
    }
    public IsGamePaused(): boolean {
      return this.gamePaused;
    }
    public IsGameEnded(): boolean {
      return this.gameEnded;
    }
  }
}