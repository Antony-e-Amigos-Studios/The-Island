class Ui {
    constructor(x, y, w, h, options) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.options = options
        this.components = {}
    }

    addComponent(name, compoonent) {
        this.components[name] = compoonent
    }

    getComponent(name){
        return this.components[name]
    }

    updateComponents(ctx) {
        for (let i in this.components) {
            let component = this.components[i]
            component.update(ctx)
        }
    }
}

class UiComponents {
    constructor(options) {
        this.options = options
    }
}

class Painel extends Ui {
    constructor(x, y, w, h, options = {}) {
        super(x, y, w, h, options)
        this.options = options
        this.elements = {}
    }

    addElement(name, element){
        this.elements[name] = element
    }

    update(ctx) {
        if (this.options.backgroundImg) {
            ctx.drawImage(this.options.backgroundImg, this.x, this.y, this.w, this.h)
        }
        for (let i in this.elements) {
            let elemento = this.elements[i]
            elemento.x += this.x
            elemento.y += this.y
            elemento.update(ctx)
            elemento.updateComponents(ctx)
        }
        this.updateComponents(ctx)
    }
}

class Effect extends UiComponents {
    constructor() {
        super()
        this.Effects = {}
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.height = innerHeight
        this.canvas.width = innerWidth
        this.canvas.className = 'subcanvas effect'
        document.body.append(this.canvas)
    }

    addEffect(effect) {
        this.effects = effect
    }

    update() { }
}

class FadeTrasitionEffect extends Effect {
    constructor(fadeDuration, duration) {
        super()
        this.duration = duration * 1000
        this.fadeDuration = fadeDuration * 1000
        this.addEffect(this)
        this.amount = 1
    }

    start() {
        this.fadein()
    }

    remove() {
        this.canvas.parentNode.removeChild(this.canvas)
    }

    fadein(amount = 1) {
        if (amount > 0) {
            setTimeout(() => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.fillStyle = `rgba(25, 25, 25, ${amount})`
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
                amount -= 0.01
                this.fadein(amount)
            }, this.fadeDuration / 500)
        } else {
            setTimeout(() => {
                this.fadeout(amount)
            }, this.duration)
        }
    }

    fadeout(amount = 0) {
        if (amount <= 1) {
            setTimeout(() => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.fillStyle = `rgba(25, 25, 25, ${amount})`
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
                amount += 0.01
                this.fadeout(amount)
            }, this.fadeDuration / 500)
        } else {
            setTimeout(() => {
                this.fc()
            }, this.dalay)
        }
    }

    onFadeEnd(fc, dalay = 0) {
        this.fc = fc
        this.dalay = dalay * 1000
    }

}

export { Ui, Painel, UiComponents, Effect, FadeTrasitionEffect}