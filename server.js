// 'console.log("hello world!");'

import {WebSocketServer} from 'ws';

// Create WebSocket server
const wss = new WebSocketServer({port: 8081});

// Listen on new connections
wss.on('connection', (ws) => {
    console.log("hello world");
    console.log("New client connections");

    // Websocket events (ws) for single client

    // close event
    ws.on('close', () => {
        console.log("Client disconnected")
    });
});