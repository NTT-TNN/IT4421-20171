var LocalStrategy = require('passport-local').Strategy;

var User = require('../model/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    // User.findById(id, function(err, user) {
      done(null, user);
    // });
  });

  passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
},
function(req, email, password, done) {
  process.nextTick(function() {
    User.findUser(email,password, function(err, user) {
      if (err)
          return done(err);
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already in use.'));
      } else {
        var newUser = new User();
        console.log("tên",req.body.user_name);
        newUser.local.user_name = req.body.user_name;
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function(err) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });
  });
}));
passport.use('local-login', new LocalStrategy({
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true,
 },
 function(req, email, password, done) {
   User.findUser(email,password, function(err, user) {
     if (err)
         return done(err);
     if(user!=""){
       return done(null, user,req.flash('loginMessage', 'Login success'));
     }
     return done(null, false, req.flash('loginMessage', 'Wrong password.'));
   });
 }));

};
