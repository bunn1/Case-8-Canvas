function init(e) {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    // Set width and height variable
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);


    // Starting position square
    let x = width / 2;
    let y = height / 2;

    // Nytt--------------------------------------------------------------------------------------------------------------------
    let objRect = { 
        x:x,
        y:y
    }

    let commands = {
        left: false,
        right: false,
        up: false,
        down: false
    }

    // Speed for square 
    let speed = 40;

    // The square moves at commands
    function draw() {
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
        y = Math.min(Math.max(y, 10), height - 10)

        // Draw background
        context.fillStyle = '#4CAF50';
        context.fillRect(0, 0, width, height);

        // Draw border
        context.strokeStyle = 'black';
        context.lineWidth = 15;
        context.strokeRect(10, 10, width - 20, height - 20);

        // Draw player - Nytt objRect.x o objRect.y
        context.strokeStyle = '#FFD700';
        context.lineWidth = 15;
        context.strokeRect(objRect.x - 5, objRect.y - 5, 100, 100);
        // Nytt ovan - ändrat objRect o objRect.y-----------------------------------------------------------------------------------

        // Set next frame

        requestAnimationFrame(draw)
        //     setInterval(function() {
        // }, 10000);

    }

    // Event Listener press keydown
    window.addEventListener('keydown', function (event) {
        switch (event.key) {
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

        // Nytt-----------------------------------------------------------------------------------------------------------------------
        let object = {
            x: x,
            y: y,
            type: "move"
        };
        console.log(object);
        websocket.send(JSON.stringify(object));

      
    })


    // Event Listener "let go of arrow keys"
    window.addEventListener('keyup', function (event) {
        switch (event.key) {
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


    const handleSocketMessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.type === "move") {
            // console.log("thena")    
            console.log("instructions from server", message)
            console.log("local commands", commands)

            // test(message)
            // context.strokeStyle = '#ef8344';
            // context.lineWidth = 15;
            // context.strokeRect(x - 5, y - 5, 100, 100);
        }

    }
    websocket.onmessage = handleSocketMessage;

    
}

window.onload = init;


// __________________________________________________________________


//    Dom elements
const inputText = document.getElementById("inputText");
const setNickname = document.querySelector("#setNickname");

// Nytt------------------------------------------------------------------------------------------------------------------------------------------
function showSquareOnEachClient(obj, objRect) {  
    context.strokeStyle = '#FFD700';
    context.strokeRect(objRect.x, objRect.y, 100, 100);
    context.stroke()
    console.log("goddag", obj)
}

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");


// Variable current user / nickname / undefined
let nickname;

// Use Websocket
const websocket = new WebSocket('ws://localhost:8081');

// test function to add message to conversation
// renderMessage({nickname:"Sam", msg:"Mr Frodo"})

// Event Listeners

// Listen on close event (server) in inspector mode
websocket.addEventListener('close', (event) => {
    console.log('Server down...', event);
    document.getElementById('status').textContent = 'sorry...server down';
})

// send json to server - make to obj = JSON.parse()

// Listen to messages from client to server
websocket.addEventListener('message', (event) => {
    // console.log(event.data)

    // Om det är ett chatt meddelande så är object.type inte leaving. Om någon lämnar är obj.type leaving 
    let obj = parseJSON(event.data);
    // console.log(obj.type, obj.msg, obj.nickname)

    if (obj.type === "leaving") {

        let div = document.querySelector('.disconnected')
        console.log(div)
        div.innerHTML = "Leaving chat"
    }

    // Renderar obj om det är ett chatt meddelande
    if (obj.type === "text") {

        renderMessage(obj)
    }

    if (obj.type === "move") {
        console.log(obj, obj.commands.x, obj.commands.y)

        // Nytt --------------------------------------------------------------------------------------------------------------------------
        objRect.x = obj.commands.x
        objRect.y = obj.commands.y
        console.log(objRect)
        showSquareOnEachClient(obj, objRect);
    }


    //     //  context.strokeRect(obj.x, obj.y, 100, 100);
    //     //  context.fill();
    //     //  context.save()
    //     //  context.beginPath();
    //  }

    setNickname.addEventListener("click", () => {

        // get value from input nickname
        nickname = document.getElementById('nickname').value;
        console.log(nickname)

        // if set - disable input nickname
        document.getElementById('nickname').setAttribute('disabled', true);

        // enable input field
        document.getElementById("inputText").removeAttribute("disabled");

        // focus input field
        document.getElementById("inputText").focus();

    });


    inputText.addEventListener("keydown", (event) => {
        // console.log(event)

        // Press Enter.... make sure at least one char
        if (event.key === "Enter" && inputText.value.length > 0) {

            // Chat message - send text to server
            // Chat message
            let objMessage = {
                msg: inputText.value,
                nickname: nickname
            }

            // show new message for this user
            renderMessage(objMessage);

            // Send text to Server
            websocket.send(JSON.stringify(objMessage));

            // reset input field
            inputText.value = "";
        }

    })

    const myEmojis = ["😃", "🙃", "😇", "🤔", "🤠"]

    function renderEmojis() {
        for (let i = 0; i < myEmojis.length; i++) {
            const emoji = document.getElementById("inputText")
            emoji.textContent += myEmojis[i]
        }
    }
    console.log(myEmojis)

    renderEmojis()
    const pushBtn = document.getElementById("push-btn")
    pushBtn.addEventListener("click", function () {
        const emojiInput = document.getElementById("inputText")
        emojiInput.value += myEmojis[Math.floor(Math.random() * myEmojis.length)];
        //  if (emojiInput.value){
        //      myEmojis.push(emojiInput.value)
        //      emojiInput.value = ""
        //      renderEmojis()
        //  }
    })
    console.log(pushBtn)


    // Functions......

    /**
     *parse JSON
     *
     * @param {*} data
     * @return {obj} 
     */
    function parseJSON(data) {

        // Avoid error using try-catch - server still running
        try {
            // handle json - gör om sträng till obj mha parse metoden 
            let obj = JSON.parse(data);
            console.log("obj", obj);

            return obj;

            // Om den inte gör som rad 6 dirigerar
        } catch (error) {
            // Log to file in real application......
            console.log("Error receiving data...data type:", typeof data);


            return {
                error: "An error..."
            }
        }
    }

    /**
     *render new message
     *
     * @param {obj}
     *  
     */

    function renderMessage(obj) {
        // Use template - cloneNode to get info fragment
        let template = document.getElementById("message").cloneNode(true);
        console.log("template", template)


        // use content to access content
        let newMsg = template.content

        // Change content template
        newMsg.querySelector("span").textContent = obj.nickname;
        newMsg.querySelector("p").textContent = obj.msg;

        // New Date object
        let objDate = new Date();

        // visual: 10:41 .. 9:5 .. leading zero ....
        newMsg.querySelector("time").textContent = objDate.getHours() + ":" + objDate.getMinutes();

        // Set datetime attribute - see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
        newMsg.querySelector("time").setAttribute("datetime", objDate.toISOString());

        // render using prepend method - last message first
        document.getElementById("conversation").prepend(newMsg);
    }

  
})

    


