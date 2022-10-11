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