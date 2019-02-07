process.env.UV_THREADPOOL_SIZE = 1;
const express = require( 'express' );
const crypto = require( 'crypto' );
const { Worker } = require( 'webworker-threads' );
const app = express();



app.get( '/', ( req, res ) => {
    const worker = new Worker(function() {
        this.onmessage = function() {

            let counter = 0;
            while ( counter < 1e9 ) {
                counter++;
            }

            postMessage( counter );
        }
    });

    worker.onmessage = function( message ) {
        console.log( message );
        res.send( '' + message.data );
    }

    worker.postMessage();

});

app.get( '/fast', ( req, res ) => {
    res.send( 'This was fast!' );
});

app.listen( 3030 );




