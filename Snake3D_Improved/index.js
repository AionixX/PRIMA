"use strict";
var Snake3D_Improved;
(function (Snake3D_Improved) {
    var ƒ = FudgeCore;
    window.addEventListener("load", Init);
    let camera;
    let viewport;
    let gameFieldSize = 20;
    let gamePaused = false;
    let gameEnd = false;
    function Init() {
        camera = new ƒ.ComponentCamera();
        camera.pivot.translateZ(50);
        camera.pivot.rotateY(180);
        let graph = new ƒ.Node("Graph");
        const canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, camera, canvas);
        viewport.draw();
        document.addEventListener("keydown", HandleInput);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, Update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 4);
    }
    function Update() {
    }
    function HandleInput(_event) {
    }
})(Snake3D_Improved || (Snake3D_Improved = {}));
//# sourceMappingURL=index.js.map