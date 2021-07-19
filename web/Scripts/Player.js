import { GameObject } from "../Engine/GameObject.js"
import { SpriteSheetAnimator, loadSprite } from "../Engine/Animator.js";
import { BasicMovement } from "../Engine/miscComponents.js";
import { Audio, AudioPlayer } from '../Engine/Audio.js'

export default class Player extends GameObject {
    constructor(x, y, w, h, game) {
        super(x, y, w, h);

        this.add_component("spriteanimator", new SpriteSheetAnimator(4, 3));
        this.get("spriteanimator").assoc_animations(["idle", "back", "left", "right"], [0, 1, 2, 3]);
        this.get("spriteanimator").set_current_animation("idle");

        const on_load_sprites = (img) => {
            this.get("spriteanimator").set_spritesheet(img);
            this.get("spriteanimator").set_scale(3);
        };

        this.add_component("audioplayer", new AudioPlayer());
        this.get("audioplayer").add_sounds(
            { url: "./Songs/WalkSongs/Dirt/Walk1.mp3", volume: 1, audioname: "walk1", options: { loop: true } },
            { url: "./Songs/WalkSongs/Dirt/Walk2.mp3", volume: 1, audioname: "walk2", options: { loop: true } },
            { url: "./Songs/WalkSongs/Dirt/Walk3.mp3", volume: 1, audioname: "walk3", options: { loop: true } });

        this.get("audioplayer").set_current("walk1");

        loadSprite("Img/entitys/player.png", on_load_sprites);

        this.get("spriteanimator").set_velocity(10);
        this.get("spriteanimator").play();
        this.add_component('movement', new BasicMovement(this, 4, ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]))
        this.add_component('ysort', new Ysort(this, game))

        this.get("audioplayer").on_stop_callback(() => {
            const mov = this.get("movement");
            if (!mov.xspd && !mov.yspd) {
                this.get("audioplayer").stop();
                this.get("audioplayer").set_current("", { random: true, from: ["walk1", "walk2", "walk3"] });
            }
        });
    }
    
    update(_game) {
        if (this.get("movement")) {
            let mov = this.get("movement");
            if (mov.xspd > 0) {
                this.get("spriteanimator").set_current_animation("right");
            } else if (mov.xspd < 0) {
                this.get("spriteanimator").set_current_animation("left");
            }

            if (mov.yspd > 0) {
                this.get("spriteanimator").set_current_animation("idle");
            } else if (mov.yspd < 0) {
                this.get("spriteanimator").set_current_animation("back");
            }

            if (!mov.xspd && !mov.yspd) {
                this.get("spriteanimator").stop();
            } else {
                this.get("audioplayer").play();
                this.get("spriteanimator").play();
            }
        }
    }
}