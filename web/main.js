/**
 */

//Engine Imports
import Game from "./Engine/Game.js";
import { loadSprite } from "./Engine/Animator.js";
import Camera from "./Engine/Camera.js"
import Scene from "./Engine/Scene.js"
import { Audio } from './Engine/Audio.js'
import { Menu, MenuComponent } from './Engine/Menu.js'
import { FadeTrasitionEffect, Painel } from './Engine/UiComponents.js'

//Scripts Imports
import Player from "./Scripts/Player.js";
import Vida from './Scripts/Vida.js';
import Inventario from "./Scripts/Inventario.js";

//Matrix Imports
import make_game from './Matrixs/mapMatrix.js'
import make_tree from './Matrixs/treeMatrix.js'

//Criação do jogo
const game = new Game();

let center = game.center({w: 100, h: 100});
let player = new Player(center.x, center.y, 100, 100, game);

// TODO: setar o plano de fundo (colocar na cena futuramente?)
loadSprite("Img/water/water1.jpg", img => game.setbg(img));

/////////////////////////Renderização do mapa///////////////////////////////////

const camera = new Camera(300, 300, player);

game.create_scene("Jogo", new Scene(
    make_game(player.w),
    make_tree(player.w)
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
    // TODO: add UI components to scene instead of on game
    game.add_component('Ui', new MenuComponent(game.canvas))
    game.get('Ui').add_component('inv', new Inventario(15, 25, 45, 45, 5, 5))
    game.get('Ui').add_component('vida', new Vida(5, 25, 45, 45, 5, 10, 10))
    setTimeout(() => {
        game.get('fade').remove()
    }, 100)
}, 2)
game.get('fade').start()
game.set_current_scene("LoadMenu1");
game.main();