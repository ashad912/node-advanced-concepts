//it tells libuv to use only two threads
//on windows need to set it before script runs
//process.env.UV_THREADPOOL_SIZE = 2;



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

hashAlg('a', 'b', 10000, 512, 'sha512', () => {
    console.log('3:', Date.now() - start, 'ms')
})

hashAlg('a', 'b', 10000, 512, 'sha512', () => {
    console.log('4:', Date.now() - start, 'ms')
})

hashAlg('a', 'b', 10000, 512, 'sha512', () => {
    console.log('5:', Date.now() - start, 'ms')
})

//detection of libuv four threads: 
//result:
// 1: 50 ms
// 3: 56 ms
// 4: 60 ms
// 2: 60 ms
// 5: 99 ms <- cannot done earlier (all threads were busy)

// hashAlg('a', 'b', 10000, 512, 'sha512', () => {
//     console.log('6:', Date.now() - start, 'ms')
// })

// hashAlg('a', 'b', 10000, 512, 'sha512', () => {
//     console.log('7:', Date.now() - start, 'ms')
// })

// hashAlg('a', 'b', 10000, 512, 'sha512', () => {
//     console.log('8:', Date.now() - start, 'ms')
// })