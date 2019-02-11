jest.setTimeout( 30000 );

// Dependencies
const keys = require( '../config/keys' );
const mongoose = require( 'mongoose' );
require( '../models/User' );

// Allowing Jest to connect to Database
mongoose.Promise = global.Promise;
mongoose.connect( keys.mongoURI, { useMongoClient: true });
