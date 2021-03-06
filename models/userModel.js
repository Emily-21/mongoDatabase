const { Schema, model } = require('mongoose');

let user = new Schema({
   userName: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
}, {
   toObject: {
      virtuals: true
   }
});

//whatever data you have in the form fields, need to be in the scheme as the database info

// user.statics.findUser = async function() {

//    let user = await this.findOne({ userName: userName });
//    return user;
   //console.log(this);
//}




module.exports = model('users', user);