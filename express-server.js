import express from 'express';

import http from 'http'

import {WebSocketServer} from 'ws'

import {parseJSON, broadcast, broadcastButExclude} from './libs/functions.js'


const port = 8081;

const app = express();

app.use(express.static('public'))

const server = http.createServer(app)

const wss = new WebSocketServer({noServer: true});

server.on('upgrade', (req, socket, head) => {
    console.log('Upgrade event client', req.headers)


    wss.handleUpgrade(req, socket, head, (ws) => {
        console.log('let user use websocket')
    })
})

server.listen(port, (req, res) => {
    console.log(`Express server (and http) running on port ${port}`)
})