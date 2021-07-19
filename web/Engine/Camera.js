import Component from "./Component.js"

class Camera extends Component {
    constructor(width, height, target) {
        super();
        this.target = target;
        this.x = 0;
        this.y = 0;
        this.w = width
        this.h = height
    }

    lerp(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    }

    update(_ctx, game) {
        if (game.get_current_scene().layers) {

            let max = game.get_current_scene().layers[0].get_limits();
            this.x = this.lerp(this.x, this.target.x - Math.round(game.width / 2), 0.1);
            this.y = this.lerp(this.y, this.target.y - Math.round(game.height / 2), 0.1);

            this.x = Math.max(0, this.x);
            this.y = Math.max(0, this.y);
            this.x = Math.min(max.x - game.width, this.x);
            this.y = Math.min(max.y - game.height, this.y);


            for (let i = 0; i < game.get_current_scene().layers.length; i++) {
                game.get_current_scene().layers[i].apply_to_all(this.apply.bind(this));
                game.apply_to_all_entities(this.apply.bind(this));
            }
        }
    }

    apply(entity) {
        entity.move(this.x, this.y);
        entity.skip_next_position_update();
    }
}

export default Camera;