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

function toUpperCases(string) {

}

function randomNumber() {
    return 1;
}

export {parseJSON, toUpperCases, randomNumber}