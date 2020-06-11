 // postlogin cutting the 'let user = await user.findone..
 //replace the if statement with user.finduser(req.body.username)

 const User = require('../models/userModel')

 //SIGNUP SECTION

 exports.getSignup = (req, res) => {
    res.render('index');
}
 exports.createUser = async (req, res) => {
    //checking all form fields are filled in
    if (!req.body.userName || !req.body.email || !req.body.password) {
        res.render('index', { err: "Please provide all credentials" });
        return;
    }
    //if they are, it is grabbing the data from the form (using the schema) to create a new instance of a 'User'
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    });
    //here we are checking for duplicate entries in the database: 
    let isDuplicate = false; 
    //built into .save is a method which checks this entry is unique (from the unique field in the schema)
    //we are sort of 'guessing' the error would be that an entry already exists.
    await user.save().catch(() => {
        res.render('index', { err: "A user with this username or password already exists." });
        
        isDuplicate = true;
        return;
    });

    if (isDuplicate) {
        return
    }
    res.redirect(`/profile/?userName=${req.body.userName}`); 
    //all that happens with this redirect is that URL changes, a nudge to profile to do its thing
    //with redirect you are sending them to the url so need a /
    //this is bringing up unique user profile pages.
}

//Login section

exports.getLogin = (req, res) => {
    res.render('login'); //with render, you're sending them the content of this hbs file
}

exports.postLogin =  async (req, res) => {
    //checking both fields have been filled in.
    if (!req.body.userName || !req.body.password) {
        res.render('login', { err: "Please provide all credentials" });
        return;
    }
    //here we are checking the database to see if a username that someone wrote in the form already exists
    let user = await User.findOne({ userName: req.body.userName });
    //if name doesn't exist in the database, error thrown and we are returned out of function
    if (user == null) {
        res.render('login', { err: "that username doesn't exist.." });
        return;
    }
    //if it does exist, we then check password matches, if yes, profile renders.
    //here we can use userName.password because we already grabbed the data in the user.findone segment
    //meaning password is a property of userName (in the database) does the password in the form match?
    if (user.password == req.body.password) {
        res.render('profile', { user: user.toObject() });
        return;
    }
    //if no password match, error thrown
    res.render('login', { err: "the password is incorrect" });

}

//Profile Section 

exports.showProfile =  async (req, res) => {
    //here we are searching the database for a user
    
    let user = await User.findOne({ userName: req.query.userName }); 
    if (user == null) {
        res.render('profile', { err: "that user doesn't exist" });
        return;
    }
    //if there is a user, we show their profile ...
    res.render('profile', { user: user.toObject() });
}
