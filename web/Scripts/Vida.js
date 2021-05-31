import { Ui } from '../Engine/UiComponents.js'

export default class Vida extends Ui {
    constructor(x, y, img_w, img_h, margin, vida, maxVida){
        super(x, y, innerWidth, innerHeight)
        this.img_h = img_h
        this.img_w = img_w
        this.vida = vida
        this.margin = margin
        if(!Number.isInteger(maxVida / 2)){
            throw new Error('The maximum amount of life has to be even, maxlife: ' + maxVida / 2)
            return;
        }
        this.maxVida = maxVida / 2

        this.img1 = new Image(img_w, img_h)
        this.img1.src = './Img/icones/Ui/Vida1.png'
        this.img2 = new Image(img_w, img_h)
        this.img2.src = './Img/icones/Ui/Vida0.png'
        this.img3 = new Image(img_w, img_h)
        this.img3.src = './Img/icones/Ui/Vida2.png'

        this.updateHealth()
    }

    updateHealth(){
        let vidaTotal = this.vida / 2
        let vidaArr = new Array(this.maxVida)
        vidaArr.fill(2)
        if(Number.isInteger(vidaTotal)){
            vidaArr.fill(1, 0, vidaTotal)
        }else{
            vidaArr.fill(1, 0, Math.floor(vidaTotal))
            vidaArr.fill(0, Math.floor(vidaTotal), Math.floor(vidaTotal) + 1)
        }
        vidaArr.reverse()
        this.vidaArr = vidaArr
    }

    update(ctx){
        for(let i in this.vidaArr){
            if(this.vidaArr[i] == 1){
                ctx.drawImage(this.img1, this.w - ((i+1) * this.margin + this.x) - this.img_w, this.y, this.img_w, this.img_h)
            }else if(this.vidaArr[i] == 0){
                ctx.drawImage(this.img2, this.w - ((i+1) * this.margin + this.x) - this.img_w, this.y, this.img_w, this.img_h)
            }else if(this.vidaArr[i] == 2){
                ctx.drawImage(this.img3, this.w - ((i+1) * this.margin + this.x) - this.img_w, this.y, this.img_w, this.img_h)
            }
        }
    }
}