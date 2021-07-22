/**
 * gustavo é furry
 */
// import Component from "./Component.js"
import Tile from "./Tile.js"
// import TileManager from "./TileManager.js"
// import Camera from "./Camera.js"

class Map {
  constructor(map, tileManager, tilesize = 64) {
    this.map = map
    this.w = map[0].length;
    this.h = map.length;
    this.tileManager = tileManager;
    this.tilesize = tilesize;
    this.has_camera = true;
    this.entitys = []
  }

  LoadGame(game) {
    this.game = game
  }

  get_limits() {
    return { x: this.tilesize * this.w, y: this.tilesize * this.h };
  }

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

export { Map, DataComponent };