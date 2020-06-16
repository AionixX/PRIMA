"use strict";
var L09_TowerDefenseStart;
(function (L09_TowerDefenseStart) {
    // import ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class NodePickable extends ƒAid.Node {
        constructor() {
            super(...arguments);
            this.radius = 0.5;
        }
        drawPickRadius() {
            let pickData = this.getPickData();
            let crc2 = L09_TowerDefenseStart.viewport.getContext();
            crc2.beginPath();
            crc2.arc(pickData.canvas.x, pickData.canvas.y, pickData.radius.magnitude, 0, 2 * Math.PI);
            crc2.stroke();
        }
        pick(_client) {
            let pickData = this.getPickData();
            let distance = ƒ.Vector2.DIFFERENCE(_client, pickData.canvas);
            if (distance.magnitudeSquared < pickData.radius.magnitudeSquared)
                return pickData;
            return null;
        }
        getPickData() {
            let projection = L09_TowerDefenseStart.viewport.camera.project(this.mtxWorld.translation);
            let posClient = L09_TowerDefenseStart.viewport.pointClipToClient(projection.toVector2());
            let projectionRadius = ƒ.Vector3.X(this.radius * this.mtxWorld.scaling.magnitude); // / 1.414);
            projectionRadius.transform(L09_TowerDefenseStart.viewport.camera.pivot, false);
            projectionRadius = L09_TowerDefenseStart.viewport.camera.project(ƒ.Vector3.SUM(this.mtxWorld.translation, projectionRadius));
            let posRadius = L09_TowerDefenseStart.viewport.pointClipToClient(projectionRadius.toVector2());
            return { clip: projection, canvas: posClient, radius: ƒ.Vector2.DIFFERENCE(posRadius, posClient) };
        }
    }
    L09_TowerDefenseStart.NodePickable = NodePickable;
})(L09_TowerDefenseStart || (L09_TowerDefenseStart = {}));
//# sourceMappingURL=NodePickable.js.map