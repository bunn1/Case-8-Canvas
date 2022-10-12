/**
 *parse JSON
 *
 * @param {*} data
 * @return {obj} 
 */
function parseJSON(data) {

        // Avoid error using try-catch - server still running
        try{ 
            // handle json - gör om sträng till obj mha parse metoden 
            let obj = JSON.parse(data);
            console.log("obj", obj);

            return obj;
    
            // Om den inte gör som rad 6 dirigerar
            } catch(error){
                // Log to file in real application......
                console.log("Error receiving data...data type:", typeof data);

                return {error: "An error..."}
            }
}

// function sendMoveRectangel(websocketConnection){
    
// }

// function recieveMoveRectangel(ctx, args){
//     // Server tell client to move rectangel
// }




function toUpperCases(string) {

}

function randomNumber() {
    return 1;
}

/**
 *broadcast to clients
 *
 * @param {WebSocketServer} wss
 * @param {obj} objBroadcast
 */
function broadcast(wss, objBroadcast) {

        // Broadcast to all clients 
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(objBroadcast))
        })

}

/**
 *broadcast to clients, but not itself
 *
 * @param {WebSocketServer} wss
 * @param {obj} wsExclude
 * @param {obj} objBroadcast
 */
 function broadcastButExclude(wss, wsExclude, objBroadcast) {
    
    // Broadcast to all clients 
    wss.clients.forEach((client) => {
        if (client !== wsExclude){ 
            client.send(JSON.stringify(objBroadcast))
        }
    })

}

export {parseJSON, toUpperCases, randomNumber, broadcast, broadcastButExclude}