const {Router} = require('express');
const router = Router();

const User = require('../models/userModel')


router.get('/', (req, res) => {
    res.render('index');
}) 

router.get('/login', (req, res) => {
    res.render('login'); //with render, youre sending them the content of this hbs file
});

router.get('/profile', async (req, res) => {
    let user = await User.findOne({userName: req.query.userName});
    if (user == null) {
        res.render('profile', {err: "that user doesn't exist"});
        return;
    }
    
    res.render('profile', {user: user.toObject()});
    
})



router.post('/login', async (req, res) => {

    if (!req.body.userName || !req.body.password) {
        res.render('login', {err: "Please provide all credentials"});
        return;
    }
   let userName = await User.findOne({userName: req.body.userName})

   if (userName == null) {
    res.render('login', {err: "that username doesn't exist.."});
    return; }


    if (userName.password == req.body.password) {
   res.render('profile', {user:user.toObject()});
   return;
    }

   res.render('login',{err: "the password is incorrect"});
   
}

router.post('/login', (req, res) => {
    res.redirect('/profile');
})

router.post('/signup', async (req, res) => {
    if (!req.body.userName || !req.body.email || !req.body.password) {
        res.render('index', {err: "Please provide all credentials"});
        return;
        }
   
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    });

    let isDuplicate = false; 

await user.save().catch((reason) => {
    res.render('index', {err: "A user with this username or password already exists."});

        isDuplicate = true;
        return;
});

if (isDuplicate) {
    return
}
res.redirect(`/profile/?userName=${req.body.userName}`); //with redirect you are sending them to the url so need a /
//this is bringing up unique user profile pages.
}) 



module.exports = router();
