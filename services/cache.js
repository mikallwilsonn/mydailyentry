// Dependencies
const mongoose = require( 'mongoose' );
const redis = require( 'redis' );
const util = require( 'util' );
const keys = require( '../config/keys' );

// Redis Config

const client = redis.createClient( keys.redisURL );
client.hget = util.promisify( client.hget );


// Attaching a cache() function to mongoose queries.
// If .cache() is chained onto a query then the this._cache flag
// will be set to true
mongoose.Query.prototype.cache = function( options = {} ) {
    this._cache = true;
    this.hashKey = JSON.stringify( options.key || '' );

    return this;
};


// Adds code to be run with the mongoose Query exec function.
// Checks if _cache if false then does a normal query and
// if false then stores in Redis cache server and returns
// the query results as normal.
const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = async function() {

    if ( !this._cache ) {
        return exec.apply( this, arguments );
    }


    const key = JSON.stringify( 
        Object.assign(
            {}, 
            this.getQuery(), 
            { collection: this.mongooseCollection.name } 
        ) 
    ); 

    const cacheValue = await client.hget( this.hashKey, key ); 

    if ( cacheValue ) {

        const doc = JSON.parse( cacheValue );

        return Array.isArray( doc ) 
            ? doc.map( d => new this.model( d )) 
            : new this.model( doc ) 
    }

    
    const result = await exec.apply( this, arguments ); 
    client.hset( this.hashKey, key, JSON.stringify( result, 'Ex', 10 ));
} 


// Exports a function for clearing the cache
module.exports = { 

    clearHash( hashKey ) { 
      client.del( JSON.stringify( hashKey )); 
    } 
  
  }
