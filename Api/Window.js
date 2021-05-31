const { app, BrowserWindow } = require('electron')

class Window{
    constructor(options){
        this.options = options
    }

    create(url){
        app.whenReady().then(()=>{
            console.log('Create Window')
            this.createWindow()
            this.win.loadFile(url)
            this.win.webContents.openDevTools() //Debug
        }).then(()=>{
            this.win.on('ready-to-show', ()=>{
                this.win.show()
                console.log('Show Window')
            })

            app.on('activate', ()=>{
                if(BrowserWindow.getAllWindows().length === 0){
                    this.createWindow()
                    this.win.loadFile(url)
                }
            })
        })
    }

    createWindow(){
       this.win = new BrowserWindow({
           width: this.options.w,
           height: this.options.h,
           fullscreen: this.options.fullscreen,
           frame: false,
           show: false,
           backgroundColor: '#191919',
           webPreferences: {
               nodeIntegration: true,
               contextIsolation: false
           }
       }) 
    }
}

module.exports = {Window}