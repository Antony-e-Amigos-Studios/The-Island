/**
 * gustavo é furry
 */
import Component from "./Component.js"
import Tile from "./Tile.js"

class TileManager {
  constructor(initial = {}) {
    this.mapper = initial;
  }

  get(name) {
    return this.mapper[name];
  }

  set(name, val) {
    this.mapper[name] = val;
  }

  options() {
    return Object.keys(this.mapper);
  }
}

class Map {
  constructor(map, tileManager, tilesize = 64) {
    this.map = map;
    this.w = map[0].length;
    this.h = map.length;
    this.tileManager = tileManager;
    this.tilesize = tilesize;
    this.has_camera = true;
    this.entitys = []
    this.game
  }

  LoadGame(game) {
    this.game = game
  }

  get_limits() {
    return { x: this.tilesize * this.w, y: this.tilesize * this.h };
  } // ta funcionando sim olha
  // tesuke ainda nao ta funcionando a parte de baixo
  // recarrega pq ta funcionando de boa
  // boa gososa se liga em como eu consertei
  // merece um push
  generateMap() {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        let current_tile = this.tileManager.get(this.map[i][j]);
        if (current_tile) {
          this.map[i][j] = new Tile(current_tile.texture);
          this.map[i][j].setScale(this.tilesize, this.tilesize);
          this.map[i][j].x = j * this.tilesize;
          this.map[i][j].y = i * this.tilesize;
        } else {
          this.map[i][j] = null;
        }
      }
    }
  }

  generateEntitys(ctx) {
    this.entitys.forEach(e => {
      e.update(this.game)
      e.position_update()
      e.update_components(ctx)
    })
  }

  add_entity(entity) {
    this.entitys.push(entity)
  }

  add_entitys(...entity) {
    entity.forEach(e => {
      this.entitys.push(e)
    })
  }

  update(ctx) {
    this.generateEntitys(ctx)

    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        if (this.map[i][j] !== null && this.map[i][j] instanceof Tile) {
          if (!this.has_camera) {
            this.map[i][j].position_update();
          }
          this.map[i][j].update_components(ctx);
        }
      }
    }
  }

  enable_camera() {
    this.has_camera = true;
  }

  apply_to_all(f) {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        if (this.map[i][j] !== null && this.map[i][j] instanceof Tile) {
          f(this.map[i][j]);
        }
      }
    }
  }
}

class DataComponent {
  constructor(info) {
    this.info = info;
  }

  update() {

  }
}

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

export { TileManager, Map, Camera, DataComponent };