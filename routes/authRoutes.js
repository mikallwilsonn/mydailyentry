// Dependencies
const passport = require('passport');


// Route exports
module.exports = app => {
  app.get( '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get( '/auth/google/callback',
    passport.authenticate('google'),
    ( req, res ) => {
      res.redirect('/blogs');
    }
  );

  app.get( '/auth/logout', ( req, res ) => {
    req.logout();
    res.redirect('/');
  });

  app.get( '/api/current_user', ( req, res ) => {
    res.send( req.user );
  });
};
