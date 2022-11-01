// /* dependencies - imports
// ------------------------------- */
// import express from 'express';

// // core module http - no npm install...
// import http from 'http';

// // use websocket server
// import { WebSocketServer } from 'ws';

// // import functions
// import { parseJSON, broadcast, broadcastButExclude } from './libs/functions.js';



// /* application variables
// ------------------------------- */
// // set port number
// const port = 3000;



// /* express
// ------------------------------- */
// // express 'app' environment
// const app = express();

// // serve static files - every file in folder named 'public'
// app.use(express.static('public'));


// /* server
// ------------------------------- */
// // use core module http and pass express as an instance
// const server = http.createServer(app); 


// // create WebSocket server - use a predefined server
// const wss = new WebSocketServer({noServer: true});

// // upgrade event - websocket communication
// server.on('upgrade', (req, socket, head) => {
//     console.log('Upgrade event client: ', req.headers);

//     // use authentication - only logged in users allowed ?


//     // start websocket
//     wss.handleUpgrade(req, socket, head, (ws) => {
//         console.log("let user use websocket...");
//     });

// });





// server.listen(port, (req, res) => {
//     console.log(`Express server (and http) running on port ${port}`);
// });


// // use method listen - server start
// // app.listen(port, (req, res) => {
// //     console.log(`Express server running on port ${port}`);
// // });





























// // import express from 'express';

// // import http from 'http'

// // import {WebSocketServer} from 'ws'

// // import {parseJSON, broadcast, broadcastButExclude} from './libs/functions.js'


// // const port = 8081;

// // const app = express();

// // app.use(express.static('public'))

// // const server = http.createServer(app)

// // const wss = new WebSocketServer({noServer: true});

// // server.on('upgrade', (req, socket, head) => {
// //     console.log('Upgrade event client', req.headers)


// //     wss.handleUpgrade(req, socket, head, (ws) => {
// //         console.log('let user use websocket')
// //     })
// // })

// // server.listen(port, (req, res) => {
// //     console.log(`Express server (and http) running on port ${port}`)
// // })