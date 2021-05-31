const { Window } = require('./Api/Window')

console.clear()
let window = new Window({fullscreen: true})
window.create('./web/index.html')