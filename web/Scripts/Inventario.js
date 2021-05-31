import { Ui } from '../Engine/UiComponents.js'

export default class Inventario extends Ui {
    constructor(x, y, img_w, img_h, margin, slots) {
        super(x, y, innerWidth, innerHeight)
        this.x = x
        this.y = y
        this.img_w = img_w
        this.img_h = img_h
        this.margin = margin
        this.img1 = new Image(img_w, img_h)
        this.img1.src = './Img/icones/Ui/Inventario1.png'
        this.img2 = new Image(img_w, img_h)
        this.img2.src = './Img/icones/Ui/Inventario2.png'
        this.slots = new Array(slots)
        this.slotSelected = 0
        this.clicked = false
        this.keyPresed = false
        this.mousex = 0
        this.mousey = 0
        this.key = null
        this.updateSlots()
        this.slotEvent()
        this.slotSelectedSize = 7
    }

    update(ctx) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] == 0) {
                ctx.drawImage(this.img1, (i * (this.img_w + this.margin)) + this.x, this.y, this.img_w, this.img_h)
            } else {
                ctx.drawImage(this.img2, (i * (this.img_w + this.margin)) + this.x - this.slotSelectedSize/2, this.y - this.slotSelectedSize/2, this.img_w + this.slotSelectedSize, this.img_h + this.slotSelectedSize)
            }
            if (this.clicked) {
                let x = (i * (this.img_w + this.margin)) + this.x
                let y = this.y
                if (this.mousex > x && this.mousex < x + this.img_w && this.mousey > y && this.mousey < y + this.img_h) {
                    this.slotSelected = i
                    this.updateSlots()
                }
            }
            if (this.keyPresed) {
                this.slotSelected = isNaN(parseInt(this.key)) ? this.slotSelected : parseInt(this.key) - 1
                if(this.slotSelected + 1 > this.slots.length || this.slotSelected < 0){
                    this.slotSelected = this.slots.length - 1
                }
                this.updateSlots()
            }
        }
    }

    updateSlots() {
        for (let i = 0; i < this.slots.length; i++) {
            if (i == this.slotSelected) {
                this.slots[i] = 1
            } else {
                this.slots[i] = 0
            }
        }
    }

    slotEvent() {
        addEventListener('mousedown', e => {
            this.clicked = true
            this.mousex = e.clientX
            this.mousey = e.clientY
        })

        addEventListener('mouseup', () => {
            this.clicked = false
            this.mousex = 0
            this.mousey = 0
        })

        addEventListener('keydown', e => {
            this.keyPresed = true
            this.key = e.key
        })

        addEventListener('keyup', e => {
            this.keyPresed = false
            this.key = null
        })
    }
}