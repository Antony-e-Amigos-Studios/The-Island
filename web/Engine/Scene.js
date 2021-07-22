export default class Scene {
    constructor(...generatedMaps) {
        // this.entitys
        this.layers = generatedMaps;
    }

    update(ctx) {
        for (let layer of this.layers) {
            layer.update(ctx);
        }
    }
}