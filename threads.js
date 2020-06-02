const hashAlg = require('crypto').pbkdf2

//want to detect single-threaded


const start = Date.now()

hashAlg('a', 'b', 10000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start, 'ms')
})

hashAlg('a', 'b', 10000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start, 'ms')
})

//result in terminal:
// 1: 51 ms
// 2: 57 ms

//if node were single threaded, we suppose to get sth like 
// 1: 51 ms
// 2: ~ 105 ms
// !!!