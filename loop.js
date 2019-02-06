// Just pseudo code that does not work but is meant as a 
// visual representation of what happens during the 
// Node.js Event Loop

// ----


// node myfile.js

myFile.runContents();

function shouldContinue() {
    // Check for setTimeout, setInterval, or setImmediate

    // Check for any OS tasks

    // Check for any long-running tasks

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}


const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];


// Entire body executes in one 'tick'
while( shouldContinue() ) {

    // 1) Node looks at pendingTimers and sees if there if any
    // -- functions are ready to be called: setTimeout and setInterval


    // 2) Node looks at pendingOsTasks and pendingOperations and 
    // -- calls relevant callback functions.


    // 3) Pause execution. Continues when...
    // -- a new pendingOSTask is done
    // -- a new pendingOperation is done
    // -- a timer is about to complete


    // 4) Look at pending timers, but only with functions set by
    // -- setImmediate


    // 5) Handle any 'close' events

}

// exit back to terminal