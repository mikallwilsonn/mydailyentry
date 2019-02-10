// Dependencies
const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );


// Export User Factory
module.exports = async () => {
    return new User({
        googleId: '__NO_AUTH_TEST_USER__',
        displayName: '__TEST_USER__'
    }).save();
}
