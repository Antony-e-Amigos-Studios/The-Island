import Game from "./Engine/Game.js";
import Player from "./Scripts/Player.js";
import { SpriteSheetAnimator, loadSprite, loadSprites, onLoadAllSprites } from "./Engine/Animator.js";
import { Camera, TileManager, Map } from "./Engine/Map.js";
import BasicMovement from "./Engine/miscComponents.js";
import Scene from "./Engine/Scene.js"
import Tile from "./Engine/Tile.js"
import { Audio, AudioPlayer } from './Engine/Audio.js'
import { Menu, MenuComponent } from './Engine/Menu.js'
import { FadeTrasitionEffect, Painel } from './Engine/UiComponents.js'
import Inventario from "./Scripts/Inventario.js";
import Vida from './Scripts/Vida.js';
/**
    Essa e o script mãe, sem ele nada e executado
    Esse script e chamado para a insersão de GameObjects, Components e entre outros
    
    Sua utilização e obrigadorio 
*/

const game = new Game();

let center = game.center({ x: 0, y: 0, w: 100, h: 100 });
let player = new Player(center.x, center.y, 100, 100);

player.add_component("spriteanimator", new SpriteSheetAnimator(4, 3));
player.get("spriteanimator").assoc_animations(["idle", "back", "left", "right"], [0, 1, 2, 3]);
player.get("spriteanimator").set_current_animation("idle");
let img_carregada = undefined;

const on_load_sprites = (img) => {
    player.get("spriteanimator").set_spritesheet(img);
    player.get("spriteanimator").set_scale(3);
    img_carregada = img; //calma ae
};

player.add_component("audioplayer", new AudioPlayer());
player.get("audioplayer").add_sounds(
    { url: "./Songs/WalkSongs/Dirt/Walk1.mp3", volume: 1, audioname: "walk1", options: { loop: true } },
    { url: "./Songs/WalkSongs/Dirt/Walk2.mp3", volume: 1, audioname: "walk2", options: { loop: true } },
    { url: "./Songs/WalkSongs/Dirt/Walk3.mp3", volume: 1, audioname: "walk3", options: { loop: true } });

player.get("audioplayer").set_current("walk1");

loadSprite("Img/entitys/player.png", on_load_sprites);
loadSprite("Img/water/water1.jpg", img => game.setbg(img));

player.get("spriteanimator").set_velocity(10);
player.get("spriteanimator").play();
player.add_component('movement', new BasicMovement(player, 4, ["a", "d", "w", "s"]))

player.get("audioplayer").on_stop_callback(() => {
    const mov = player.get("movement");
    if (!mov.xspd && !mov.yspd) {
        player.get("audioplayer").stop();
        player.get("audioplayer").set_current("", { random: true, from: ["walk1", "walk2", "walk3"] });
    }
});

/////////////////////////Renderização do mapa///////////////////////////////////
import mapMatrix from './Matrixs/mapMatrix.js'
import treeMatrix from './Matrixs/treeMatrix.js'

const tileManager = new TileManager();
const treeManager = new TileManager();

const mapa = new Map(mapMatrix, tileManager, player.w);

const genTree = (imglist) => {
    treeManager.set(1, new Tile(imglist["Img/tree/tree1.png"], "tree"));
    treeManager.set(7, new Tile(imglist["Img/tree/palmtree.png"], "palmtree"));
    tree.generateMap();
}

const genMap = (imglist) => {
    tileManager.set(0, new Tile(imglist["Img/grass/grama.jpg"], "grama"));
    tileManager.set(1, new Tile(imglist["Img/sand/sand.png"], "crate"));
    tileManager.set(3, new Tile(imglist["Img/water/water1.jpg"], "water"));
    mapa.generateMap();
};
const tree = new Map(treeMatrix, treeManager, player.w);

loadSprites(genMap, "Img/sand/sand.png", "Img/grass/grama.jpg", "Img/water/water1.jpg");
loadSprites(genTree, "Img/tree/tree1.png", "Img/tree/palmtree.png");

const camera = new Camera(300, 300, player);

game.create_scene("Jogo", new Scene(
    mapa,
    tree
));

let bgImg = new Image(innerWidth, innerHeight)
bgImg.src = "./Img/bg/Background1.jpg"
let painel1 = new Painel(0, 0, innerWidth, innerHeight, { backgroundImg: bgImg })
game.create_scene("LoadMenu1", new Menu(painel1))
game.add_component("camera", camera);
game.add_entity('Jogo', player);
let musica1 = new Audio('Songs/Music/Theme1.mp3', 0.8, 'Musica1', { loop: true })
let ambiente = new Audio('Songs/ambient/ambient.mp3', 0.5, 'ambiente', { loop: true })

game.add_component('fade', new FadeTrasitionEffect(2, 4))
game.get('fade').onFadeEnd(() => {
    game.set_current_scene('Jogo')
    musica1.Play()
    ambiente.Play()
    game.add_component('Ui', new MenuComponent(game.canvas))
    game.get('Ui').add_component('inv', new Inventario(15, 25, 45, 45, 5, 5))
    game.get('Ui').add_component('vida', new Vida(5, 25, 45, 45, 5, 7, 10))
    setTimeout(() => {
        game.get('fade').remove()
    }, 100)
}, 2)
game.get('fade').start()
game.set_current_scene("LoadMenu1");
game.main();