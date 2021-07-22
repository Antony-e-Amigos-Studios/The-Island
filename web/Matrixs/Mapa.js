/* A ideia aqui é criar uma classe geradora de mapas em camadas:

1ª camada : mar / lava
2º camada: solo
3º camada: acima do solo
4º camada: árvores e pedras
5º camada: casas
6º camada: inimigos
7ª camada: personagens

*/

import mapabase from './BasicMatrix.js'

// 3 é mar    | no mar não tem árvore
// 1 é areia  | 10 é coqueiros
// 0 é campo  | 11 é pinheiros

import { Map } from "../Engine/Map.js"
import TileManager from "../Engine/TileManager.js"
import Tile from "../Engine/Tile.js"
import { loadSprites } from "../Engine/Animator.js"

// /**
//  * @param {*Number frequência em que a função retornará verdadeiro (começando com 2, quanto maior, mais raro)} frequencia 
//  * @returns verdadeiro ou falso
//  */
// tem q atualizar a func pq ele fez na versão antiga do the island
function geraVerdadeiroOuFalsoAleatorio(frequencia) {
  return !Boolean(Math.floor(Math.random() * frequencia));
}
/*
  *temos um mapa com números e queremos adicionar, por exemplo, coqueiros (7) somente na área de praia (1).
  *argumentos:
  *mapa -> array bidimensional contendo números
  *numeroAAdicionarEmCima -> no exemplo, o número que significa area de areia, ou seja, 1
  *numeroAColocar -> no exemplo, o número que significa o coqueiro, ou seja, 7
  *numerosAZerar -> array onde existirão os números que devem ser zerados
  *linhaInicial (opcional) -> a linha em que o número 1 da areia começa a aparecer // posso usar também para limitar onde os coqueiros aparecerão
  *linhaFinal (opcional) -> [veja acima]
*/

let adicionaCamada = (mapa, numeroASubistituir, numeroAColocar, numerosAZerar = []) => {

  mapa.forEach(function (linha, indiceLinha) {
    linha.forEach(function (numero, indiceColuna) {
      if (numero == numeroASubistituir) {
        if (geraVerdadeiroOuFalsoAleatorio(3)) {
          mapa[indiceLinha][indiceColuna] = numeroAColocar
        }
      } else if (numerosAZerar.includes(numero)) {
        mapa[indiceLinha][indiceColuna] = 0
      }

    })
  });

  return mapa;
}

function createTree(mapaBase = new mapabase().get()) {
  let tree = adicionaCamada(mapaBase, 0, 11)
  return adicionaCamada(tree, 1, 10);
}

function make_tree(tilesize) {
  const treeManager = new TileManager();
  const tree_map = new Map(createTree(), treeManager, tilesize);

  const genTree = (imglist) => {
    treeManager.set(11, new Tile(imglist["Img/tree/tree0.png"], "tree"));
    treeManager.set(10, new Tile(imglist["Img/tree/palmtree.png"], "palmtree"));
    tree_map.generateMap();
  }

  loadSprites(genTree, "Img/tree/tree0.png", "Img/tree/palmtree.png");

  return tree_map
}

export default make_tree