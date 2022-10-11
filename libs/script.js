let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// Set width and height variable
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// Starting position square
let x = width / 2;
let y = height / 2;

let commands = {
    left: false,
    right: false,
    up: false,
    down: false
}

// Speed for square 
let speed = 40;

// The square moves at commands
function draw () {
    if (commands.left) {
        x -= speed
    }
    if (commands.right) {
        x += speed
    }
    if (commands.up) {
        y -= speed
    }
    if (commands.down) {
        y += speed
    }

// Borders - The square isnt able to cross over the screen
x = Math.min(Math.max(x, 10), width - 10) 
x = Math.min(Math.max(x, 10), height - 10) 

// Draw background
context.fillStyle = 'lightgreen';
context.fillRect(0, 0, width, height);

// Draw border
context.strokeStyle = 'black';
context.lineWidth = 15;
context.strokeRect(10, 10, width - 20, height - 20);

// Draw player
context.strokeStyle = '#ef8344';
context.lineWidth = 15;
context.strokeRect(x - 5, y - 5, 100, 100);

// Set next frame
requestAnimationFrame(draw)
}

// Event Listener press keydown
window.addEventListener('keydown', function (event){ 
switch (event.key){
    case 'ArrowUp': 
    commands.up = true
    break
    case 'ArrowDown': 
    commands.down = true
    break
    case 'ArrowLeft': 
    commands.left = true
    break
    case 'ArrowRight': 
    commands.right = true
    break
}
})

// Event Listener "let go of arrow keys"
window.addEventListener('keydown', function (event){ 
    switch (event.key){
        case 'ArrowUp': 
        commands.up = false
        break
        case 'ArrowDown': 
        commands.down = false
        break
        case 'ArrowLeft': 
        commands.left = false
        break
        case 'ArrowRight': 
        commands.right = false
        break
    }
    })
    draw();