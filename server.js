import {
    WebSocketServer
} from 'ws';

// import functions
import {
    parseJSON,
    broadcast,
    broadcastButExclude
} from './libs/functions.js'

// Create WebSocket server
const wss = new WebSocketServer({
    port: 8081
});

// Listen on new connections
wss.on('connection', (ws) => {
    console.log('New client connection from IP:', ws._socket.remoteAddress);
    console.log("New client connections");

    // Check how many clients is connected
    console.log('Number of connected clients:', wss.clients.size)
    // console.log('Number of connected clients:', wss.clients.forEach(client => console.log("hej")))


    // Websocket events (ws) for single client

    // close event - webläsaren stängs ner
    ws.on('close', () => {
        console.log("Client disconnected")

        // How many clients remain connected
        console.log('Number of remaining connected clients:', wss.clients.size)

        wss.clients.forEach((client) => client.send(JSON.stringify({
            msg: "Tjena tjena",
            type: "leaving"
        })))

    });

    // Message Event - sänder meddelandet - från client till server
    // Obs %s gör att det blir till s=sträng el o=object
    ws.on('message', (data) => {
        console.log('Message received: %s', data);

        // // Avoid error using try-catch - server still running
        // // Use defined functions to handle errors - better code
        let obj = parseJSON(data);
        console.log("data %s", data)

        let objBroadcast = {};

        if (obj.type === "text") {
            // Send message back to client
            let objReply = {
                type: "text",
                // msg: `I received a message from you: ${obj.msg}`
                msg: obj.msg,
                nickname: obj.nickname
            }

            // Send an stringified object back - server skickar json till clienten  
            // ws.send(JSON.stringify(objReply));

            objBroadcast = {
                type: "text",
                msg: obj.msg,
                // This show which person sent message
                nickname: obj.nickname
            }
        }

        if (obj.type === "move") {
            // Send message back to client
            objBroadcast = {
                type: "move",
                commands: {up:false, down:false, left:false, right:false}
                
            }

              ws.send(JSON.stringify(objBroadcast));

            wss.clients.forEach((client) => {
                if (client === ws) {
                    return
                }
                client.send(JSON.stringify(obj))
            })
        }


        // // Broadcast to all clients 
        // wss.clients.forEach((client) => {
        //     client.send(JSON.stringify(objBroadcast))
        // })

        // broadcast to all clients
        // broadcast(wss, objBroadcast);

        // broadcast to all but this ws....
        broadcastButExclude(wss, ws, objBroadcast);
    })

});
// skickar till servern
// websocket.send(JSON.stringify({ type: "clues", payload: murderer }))

// skickar servern till client - och då tar du emot den i en switch
// wss.clients.forEach((client) => {

//     client.send(JSON.stringify(killerObj))
//     });