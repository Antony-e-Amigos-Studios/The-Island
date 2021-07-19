/**
 * Antony Game Engine
 * @author Magoninho and Tsukiiii
 * @copyright Copyright (c) 2021 Antony e Amigos Studios. All rights reserved
 */
import { NonEntityGameObject } from "./GameObject.js";

export default class Game extends NonEntityGameObject {
    constructor() {
        super();
        this.xspd = 0;
        this.dt = 0;
        this.last = Date.now();
        this.yspd = 0;
        this.text = "";
        this.entities = {};
        this.background = undefined;
        this.scenes = {};
        this.scene = "";
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = innerWidth;
        this.height = innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.onload = () => {console.log('Opa')}
    }

    draw(ctx) {
        if(!this.background) {
            ctx.fillStyle = 'rgba(25, 25, 25, 1)';
            ctx.fillRect(0, 0, this.width, this.height);
        } else {
            ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            ctx.drawImage(this.background, 0, 0, this.width, this.height);
            ctx.imageSmoothingEnabled = false; // A LINHA MAIS MILAGROSA DO PROJETO
        }
    }

    setbg(img) {
        this.background = img;
    }

    apply_to_all_entities(f) {
        for (let ent of this.entities[this.scene].entity) {
            f(ent);
        }
    }

    drawtext(txt) {
      this.text = txt;
    }

    gameLoop() {
        if (this === undefined) {
            return undefined;
        }
        let now = Date.now();
        this.dt = (now - this.last) / 1000;
        this.last = now;
        this.update_components(this.ctx, this.dt);
        this.draw(this.ctx);
        if (this.scene !== "") {
            this.get_current_scene().update(this.ctx);
        }
        if(this.entities[this.scene]){
            for (let ent of this.entities[this.scene].entity) {
                ent.update(this, this.dt);
                ent.position_update();
                ent.update_components(this.ctx, this.dt);
            }
        }

        // this.ctx.font = "15px monospace";
        // this.ctx.fillStyle = "rgb(255,255,255)";
        // this.ctx.fillText(this.text,10,100);

        requestAnimationFrame(this.gameLoop);
    }

    add_entity(sceneName, entity) {
        if (!this.entities[sceneName]) {
            this.entities[sceneName] = {entity: []}
        }
        this.entities[sceneName].entity.push(entity)
    }

    remove_entity(sceneName, entity) {
        delete this.entities[sceneName].entity[entity]
    }

    get_text(name) {
      return name in this.texts;
    }

    create_scene(name, scene) {
        this.scenes[name] = scene;
    }

    get_current_scene(){
        if (this.scene !== "") {
            return this.scenes[this.scene];
        }
    }

    create_text(name) {
      this.texts[name] = "";
    }

    set_text(name, value) {
      this.texts[name] = value;
    }

    set_current_scene(name) {
        if (name in this.scenes) { // if key exists
            this.scene = name;
        }
    }

    
    center(obj_size) {
        return {x:(this.width/2 - obj_size.w/2),
                y:(this.height/2 - obj_size.h/2)};
    }

    main() {
        document.body.appendChild(this.canvas);
        setInterval(this.gameLoop.bind(this), 1000 / 60);
    }
}
