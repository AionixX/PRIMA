namespace Snake3D_Improved {
  export abstract class Controller {
    public name: string;
    protected snake: Snake;

    constructor (_name: string, _snake: Snake) {
      this.name = _name;
      this.snake = _snake;
    }

    public abstract Update(): void;

    public GetSnake(): Snake {
      return this.snake;
    }
  }
}