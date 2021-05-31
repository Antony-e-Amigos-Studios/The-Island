export default class Scene {
    constructor(...generatedMaps) {
        this.layers = [...generatedMaps];
        this.promises = {}
    }

    update(ctx) {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].update(ctx);
        }
    }

}