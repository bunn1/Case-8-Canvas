// Express modules

/* dependencies - imports
------------------------------- */
import express from 'express';

// core module http - no npm install...
import http from 'http';

import {
    WebSocketServer
} from 'ws';

// import functions
import {
    parseJSON,
    broadcast,
    broadcastButExclude
} from './libs/functions.js'

const port = 8081;

const app = express();

app.use(express.static('public'))

const server = http.createServer(app)

const wss = new WebSocketServer({
    noServer: true
})

// upgrade event - websocket communication
server.on('upgrade', (req, socket, head) => {
    console.log('Upgrade event client: ', req.headers);

    // use authentication - only logged in users allowed ?


    // start websocket
    wss.handleUpgrade(req, socket, head, (ws) => {
        console.log("let user use websocket...");

        wss.emit("connection", ws, req)
    });

});

// // Create WebSocket server
// const wss = new WebSocketServer({
//     port: 8081
// });

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
            // let objReply = {
            //     type: "text",
            //     // msg: `I received a message from you: ${obj.msg}`
            //     msg: obj.msg,
            //     nickname: obj.nickname
            // }
            // Send an stringified object back - server skickar json till clienten  
            // ws.send(JSON.stringify(objReply));
            objBroadcast = {
                type: "text",
                msg: obj.msg,
                // This show which person sent message
                nickname: obj.nickname
            }

            //     wss.clients.forEach((client) => {
            //     client.send(JSON.stringify(objBroadcast))
            // })

            broadcastButExclude(wss, ws, objBroadcast);

        }

        if (obj.type === "move") {
            // Send message back to client
            objBroadcast = {
                type: "move",
                commands: obj
            }
            console.log(obj)
            console.log(objBroadcast)
            //   ws.send(JSON.stringify(objBroadcast));

            wss.clients.forEach((client) => {
                if (client === ws) {
                    return
                }
                client.send(JSON.stringify(objBroadcast))
            })
        }

        // // Broadcast to all clients 
        // wss.clients.forEach((client) => {
        //     client.send(JSON.stringify(objBroadcast))
        // })

        // broadcast to all clients
        // broadcast(wss, objBroadcast);

        // broadcast to all but this ws....
    })



});
server.listen(port, (req, res) => {
    console.log(`Express server (and http) running on port ${port}`);
});
















