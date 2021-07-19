import { loadSprites } from '../Engine/Animator.js'
import { Ui } from '../Engine/UiComponents.js'

export default class Inventario extends Ui {
    constructor(x, y, img_w, img_h, margin, slots) {
        super(x, y, innerWidth, innerHeight)
        this.x = x
        this.y = y
        this.img_w = img_w
        this.img_h = img_h
        this.margin = margin
        this.img1src = './Img/icones/UI/Inventario1.png'
        this.img2src = './Img/icones/UI/Inventario2.png'

        loadSprites((imgs) => {
            this.img1 = imgs[this.img1src];
            this.img2 = imgs[this.img2src];
        }, this.img1src, this.img2src);

        this.slots = new Array(slots)
        this.slotSelected = 0
        this.keyPresed = false
        this.mouse = {x: 0, y:0, clicked: false}
        this.key = null
        this.updateSlots()
        this.slotEvent()
        this.slotSelectedSize = 7
    }

    update(ctx) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i] == 0 && this.img1) {
                ctx.drawImage(this.img1, (i * (this.img_w + this.margin)) + this.x, this.y, this.img_w, this.img_h)
            } else if (this.img2) {
                ctx.drawImage(this.img2, (i * (this.img_w + this.margin)) + this.x - this.slotSelectedSize/2, this.y - this.slotSelectedSize/2, this.img_w + this.slotSelectedSize, this.img_h + this.slotSelectedSize)
            }
            if (this.mouse.click) {
                let x = (i * (this.img_w + this.margin)) + this.x
                let y = this.y
                if (this.mouse.x > x && this.mouse.x < x + this.img_w && this.mouse.y > y && this.mouse.y < y + this.img_h) {
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
            this.mouse.click = true
            this.mouse.x = e.clientX
            this.mouse.y = e.clientY
        })

        addEventListener('mouseup', () => {
            this.mouse.click = false
            this.mouse.x = 0
            this.mouse.y
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