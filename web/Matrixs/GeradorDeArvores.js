class GeradorDeArvores {

    // tipo seria 'quadrado' ou 'retangular' >> não precisa, só verificar se h = w
    constructor(largura, altura, raio) {
        this.largura = largura
        this.altura = altura
        this.raio = raio
        this.mapa = null
        /*if (largura == altura) {
            this.tipo = 'quadrado'
        } else {
            this.tipo = 'retangular'
        }*/

        this.inicializaMapa(largura, altura)
    }

    // gera um array bidimensional de altura e largura dos argumentos, preenchido com 0
    inicializaMapa = function (largura, altura) {
        // o mapa de árvores do mago é 21 x 26
        this.mapa = new Array(largura).fill(0).map(() => new Array(altura).fill(0));

    }

    // a máscara será onde os objetos (árvores, no caso) poderão ser inseridas
    geraMascara() {
        //if (this.tipo == '')
        // considerando que todos os mapas são quadrados de lado ímpar...
        // TODO:
        var centro = Math.floor(matrix.length / 2);
        matrix[centro][centro] = 1


        console.log(matrix)
    }
}

new GeradorDeArvores(5, 5, 2, 'circular')

//export GeradorDeArvores