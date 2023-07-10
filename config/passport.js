const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const userModel = require('../models/user');


// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!

    try{
      //If the user has logged into AIDB we want to ensure that the their information are passed to the middlewae
      let userDocument = await userModel.findOne({googleId: profile.id});
      //If no user is found, the user will be undefined

      //If the user is to be found, we pass their info to the next middelware chain
      if(userDocument) return cb(null, userDocument);
      //In case that's the first time for the user loggign in, we need to create a user document and store it in our mongodb
      // and then pass this info to our middlware chain

      //First time Logging in to AIDB
      userDocument = await userModel.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      //pass the creates user info to the next function in the middlewae chain
      return cb(null, userDocument);
    }catch(err){
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)

  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

  //Here we are finding the user by getting the if from the session cookie and search the db
  const user = await userModel.findById(id);
  // const err = new Error(`User id ${id} not found?`);
  done(null, user);

  

});



