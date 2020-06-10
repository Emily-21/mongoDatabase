const {Router} = require('express');
const router = Router();

const User = require('../models/userModel')


router.get('/', (req, res) => {
    res.render('index');
}) 

router.get('/login', (req, res) => {
    res.render('login'); //with render, you're sending them the content of this hbs file
});

router.get('/profile', async (req, res) => { 
    //here we are searching the database for a user
    let user = await User.findOne({userName: req.query.userName}); //1. ask jacob why the difference here for req.query.username 
    if (user == null) {
        res.render('profile', {err: "that user doesn't exist"});
        return;
    }
    //if there is a user, we show their profile ... not sure of the how vs. the query string option, how/when do we use one or the other?
    res.render('profile', {user: user.toObject()});
    
})

//LOGIN SECTION

router.post('/login', async (req, res) => {
//checking both fields have been filled in.
    if (!req.body.userName || !req.body.password) {
        res.render('login', {err: "Please provide all credentials"});
        return;
    }
   let userName = await User.findOne({userName: req.body.userName}); //vs this one? coz now i get this version
//searching for the username in the database, if not, error thrown
   if (userName == null) {
    res.render('login', {err: "that username doesn't exist.."});
    return; 
}
//checking password matches, if yes, profile renders.
    if (userName.password == req.body.password) {
   res.render('profile', {user: user.toObject()});
   return;
    }
//if no password match, error thrown
   res.render('login', {err: "the password is incorrect"});
   
});
//not sure what this code is doing below? is it redudant now?
router.post('/login', (req, res) => {
    res.redirect('/profile');
});

//SIGNUP SECTION

router.post('/signup', async (req, res) => {
    //checking all form fields are filled in
    if (!req.body.userName ||!req.body.email || !req.body.password) {
        res.render('index', {err: "Please provide all credentials"});
        return;
        }
   //if they are, it is grabbing the data from the form (using the schema) to create a new instance of a 'User'
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    });
//don't get the below, how is it checking for duplicates? we aren't comparing it anywhere 
    let isDuplicate = false; 
//what is (reason) doing- it is unread(so unused here?) 
await user.save().catch((reason) => {
    res.render('index', {err: "A user with this username or password already exists."});

        isDuplicate = true;
        return;
});

if (isDuplicate) {
    return
}
res.redirect(`/profile/?userName=${req.body.userName}`); //why the re-direct and not the render here?
//with redirect you are sending them to the url so need a /
//this is bringing up unique user profile pages.
}); 

module.exports = router();
