const passport = require('passport')
const GoogleStrat = require('passport-google-oauth20').Strategy
const keys = require('./passportKey')
const User = require('./model/user')

passport.serializeUser(function(user,done){
    done(null, user.id)
});
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        done(null,user)
    });
});

passport.use(
    new GoogleStrat({
        callbackURL:'/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret

}, function (accessToken, refreshToken, profile, done ){
      User.findOne({googleId: profile.id }).then(function(currentUser){
         if(currentUser){
             done(null,currentUser)
         }else{
             new User({
                 username:profile.displayName,
                 googleId: profile.id,
                 userImage: profile.photos[0].value
             }).save().then(function(newUser){
                 done(null,newUser)
             })
         }
      });

    }));