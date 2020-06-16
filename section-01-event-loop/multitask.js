const https = require('https')
const crypto = require('crypto')
const fs = require('fs')

const start = Date.now()

function doRequest () {

    https.request('https://www.google.com', res => {
        res.on('data', () => {
            
        })
        
        res.on('end', () => {
            console.log(`Request:`, Date.now() - start, 'ms')
        })
    }).end()
}

function doHash() {
    crypto.pbkdf2('a', 'b', 10000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start, 'ms')
    })
}


doRequest()


fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS:', Date.now() - start, 'ms')
})


doHash()
doHash()
doHash()
doHash()
// doHash()
// doHash()
// doHash()


//multitask
//https is out of the threadpool! as soon as we get response, we get console.log

//fs module, first need to gets some stats on the file (requires HD access)
//when HD accessed, stats returned, node requests to read the file
//when HD accessed, file contents streamed back to app
//node returns file contents to us

//during accessing stats, thread which is responsible for fs module,
// knows that accessing may take a some time, so it leaves fs module, and look for other tasks to do

//if any task is available (4th hashing functions), it perform it

//all threads are busy - first which end with hashing, look for other tasks to do

//it finds fs task ready to continue, because hdd accessing is done now (node got 'stats' from hdd)

//that's why we get:
//Hash: 69 ms
//FS: 72 ms
//Hash: 74 ms
//Hash: 75 ms
//Hash: 76 ms
//Request: 331 ms

//observation: if in tasks to do, are available two tasks: fs op and hash op - thread pool chooses hash operation as first

