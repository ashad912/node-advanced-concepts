const express = require('express')
const app = express()
const cluster = require('cluster')

if(cluster.isMaster){
    // Cause index.js to be executed *again* but
    // in child mode
    cluster.fork()
    cluster.fork() //additional child
}else{

    // Im a child, Im going to act like a server
    // and do nothing more

    function doWork(duration){
        const start = Date.now()
        while(Date.now() - start < duration){}
    }

    app.get('/', (req, res) => {
        doWork(5000)
        res.send('Hi there!')
    })

    app.get('/fast', (req, res) => {
        res.send('This was fast')  
    })

    app.listen(3000)
}

//nodemon is not recommended for cluster mode!!!