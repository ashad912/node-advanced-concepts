//creating fake event loop node js!

// node myFile.js

const pendingTimers = []
const pedningOSTasks = []
const pendingOperations = []

// New timers, tasks, operations are recorded from myFile running
myFile.runContents(); //first - node executes all content in the file (with require/import files!!!)

function shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setImmediate?
    // Check two: Any pending OS tasks? (Like server listening to port, or incoming requests)
    // Check three: Any pending long running operations? (Like fs module)
    return pendingTimers.length || pedningOSTasks.length || pendingOperations.length
}

// Entire body executes in one 'tick'
while(shouldContinue()){
    // 1) Node looks at pendingTimers and sees if any functions
    // (callbacks) are ready to be called (only setTimeout or setInterval).

    // 2) Node looks at pendingOSTasks and pendingOperations and calls revelant callbacks

    // 3) Pause execution. Continue when... 
    // - a new pendingOSTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete

    // 4) Look at pendingTimers. Call any setImmediate -> https://flaviocopes.com/node-setimmediate/

    // 5) Handle any 'close' events (cleanup events "readStream")
}



// exit back to terminal