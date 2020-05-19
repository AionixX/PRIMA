namespace Snake3D_Improved {

  import ƒ = FudgeCore;

  window.addEventListener("load", Init);

  let camera: ƒ.ComponentCamera;
  let viewport: ƒ.Viewport;

  let gameFieldSize: number = 20;
  
  let gamePaused: boolean = false;
  let gameEnd: boolean = false;

  function Init(): void {

    camera = new ƒ.ComponentCamera();
    camera.pivot.translateZ(50);
    camera.pivot.rotateY(180);

    let graph: ƒ.Node = new ƒ.Node("Graph");

    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, camera, canvas);
    viewport.draw();

    document.addEventListener("keydown", HandleInput);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 4);
  }
  function Update(): void {

  }
  function HandleInput(_event: KeyboardEvent): void {

  }
}