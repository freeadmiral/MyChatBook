const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');

//include models
const User=require('../models/users');


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_LOGIN_CLIENT_ID,
    clientSecret:process.env.GOOGLE_LOGIN_SECRET_ID,
    callbackURL:process.env.GOOGLE_LOGIN_CALLBACK_URL
},(accessToken,refreshToken,profile,done)=>{
    const data=profile._json;
    console.log(data);
    User.findOrCreate({ // mongoose find or create 
        'googleId':data.id
    },{
        name:data.name.givenName,
        surname:data.name.familyName,
        profilePhotoUrl:data.image.url
    },(err,user)=>{
        return done(err,user);
    })

})); 
// for sessions
passport.serializeUser((user, done)=> {
    done(null, user);
  });
  
  passport.deserializeUser((user, done)=> {
    done(null, user);
  });

module.exports=passport;

