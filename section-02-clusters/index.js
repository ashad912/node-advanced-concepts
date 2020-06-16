const express = require('express')
const app = express()
const crypto = require('crypto')

app.get('/', (req, res) => {
    //doWork(5000)
    crypto.pbkdf2('a', 'b', 10000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start, 'ms')
        res.send('Hi there!')
    })
    
})

app.get('/fast', (req, res) => {
    res.send('This was fast')  
})

app.listen(3000)

//npm i -g pm2
//pm2 start index.js -i 0
//0 - pm2 figures out, how many instance to create

//pm2 list
//pm2 show index
//pm2 monit
//pm2 delete index