const express = require('express');
const router = express.Router();

const passport = require('passport');



// The root route renders our only view
router.get('/', function(req, res, next) {
  //UPDATE THIS
  // Where do you want to go for the root route
  // in the student demo this was res.redirect('/movies'), what do you want?
  // This could be a landing page, or just redirect to your main resource page which you'll have an a tag that makes 
  // a request to `/auth/google` route below
  // res.redirect('/index');
  console.log("Check here <----")

  // res.render('index', {title: 'AIDB'})
  // res.redirect('/aidb')
  res.render("index")

  // console.log('lol');
  
});



// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/aidb', // UPDATE THIS, where do you want the client to go after you login ~ Index
    failureRedirect : '/error' //  UPDATE THIS, where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(){ //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect('/aidb') // <---- UPDATE THIS TO WHERE YOU WANT THE USER TO GO AFTER LOGOUT
  })
})

module.exports = router;
