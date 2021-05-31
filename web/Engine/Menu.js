import Component from '../Engine/Component.js'

class Menu{
    constructor(...UiComponents) {
        this.components = [...UiComponents];
        
    }
    
    update(ctx) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update(ctx);
        }
    }
}

class MenuComponent extends Component{
    constructor(canvas) {
        super()
        this.components = {};
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight
        this.canvas.className = 'subcanvas Ui'
        this.ctx.imageSmoothingEnabled = false
        document.body.insertBefore(this.canvas, canvas)
    }
    
    add_component(name, component){
        this.components[name] = component
    }

    update() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight)
        for(let i in this.components){
            this.components[i].update(this.ctx)
        }
    }
}

export { Menu, MenuComponent } 