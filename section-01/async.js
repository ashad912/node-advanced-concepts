const https = require('https')


const start = Date.now()

function doRequest (no) {

    https.request('https://www.google.com', res => {
        res.on('data', () => {
            
        })
        
        res.on('end', () => {
            console.log(`${no}:`, Date.now() - start)
        })
    }).end()
}

doRequest(1)
doRequest(2)
doRequest(3)
doRequest(4)
doRequest(5)
doRequest(6)

//libuv delegates to OS making http requests and waits for confirmation
//OS by itsself manages threads used to http request (OS decides when to make request and generally how to handle all process of making requests)