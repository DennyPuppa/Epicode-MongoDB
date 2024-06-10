const authorsModel = require('../models/author');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  async function (accessToken, refreshToken, profile, cb) {
    try {
      const { email, name, family_name, picture } = profile._json
      const author = await authorsModel.findOne({ email });
      if (author) {
        console.log("there is a user");
        const accessToken = jwt.sign(
          {
            id: author.id,
            name: author.name,
            email: author.email

          }, jwtSecretKey, { expiresIn: '1h' });
        cb(null, { accessToken })
      } else {
        const newAuthor = new authorsModel({
          name: name,
          lastName: family_name,
          email: email,
          password: 'password',
          date: '-',
          avatar: picture,
        })
        const createdAuthor = await newAuthor.save()
        console.log('user creato');
        const accessToken = jwt.sign(
          {
            id: createdAuthor.id,
            name: createdAuthor.name,
            email: createdAuthor.email
          }, jwtSecretKey, { expiresIn: '1h' });
        return cb(null, { accessToken })
      }
    } catch (error) {
      cb(error)
    }
  }
);


module.exports = googleStrategy;