const express = require('express');
const hbs = require('express-handlebars');
const path = require ('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const userRouter = require('./routes/user')

mongoose.connect('mongodb+srv://Emily:Password24@cluster0-ne2wt.mongodb.net/users?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}); 


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', '.hbs');

app.use('/', userRouter)


app.listen(8080, () => {
    console.log('server is running on 8080');
})