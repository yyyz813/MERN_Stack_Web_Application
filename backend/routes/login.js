var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

var monk = require('monk');
const { response } = require('express');
var db = monk('localhost:27017/FinalProject')
var collection = db.get('users');

const bcrypt = require("bcrypt");// hash password


//protected route
router.get('/welcome', auth, function (req, res, next) {
  res.send("welcome!");
});

// register
router.post('/register', function(req, res){
  const {username, email, password} = req.body
  if(!(username && email && password)){
    res.send("All fields are required!");
  }else{
    collection.findOne({email: email}, function(err, user){
      if(err) throw err;
      if(user){
        res.send("User already exists. Please login!")
      }else{
        // let newUser = {
        //   username,
        //   email,
        //   password
        // }
        const salt = bcrypt.genSaltSync(10); // generate random prefix
        const hashedpwd = bcrypt.hashSync(password, salt)
        // res.send(salt+":"+hashedpwd);
        let newUser = {
            username: username,
            email: email,
            password: hashedpwd
          }
        collection.insert(newUser, function(err, user){
          if(err) throw err;
          var token = jwt.sign({ user_id: user._id, email }, 'secretkey'); //can add another attribute for expiration
          if(token){
            user.token = token;
          }
          res.json(user);
        })
      }   
    })
  }
});

// login
router.post('/login', function(req, res){
  const {email, password} = req.body;
  if(!(email && password)){
    res.send("All fields are required!");
  }else{
    collection.findOne({email: email}, function(err, user){
      if(err) throw err;
      if(user == null) {
        res.send("User does not exist!")
      }else{
        const pwdValid =  bcrypt.compareSync(password, user.password);// compare (plain-text-pwd, hashed-pwd)
        // res.send(pwdValid + ":" + user.password+":"+password);
        // if(user.password === password){
        if(pwdValid){
          var token = jwt.sign({ user_id: user._id, email }, 'secretkey'); //can add another attribute for expiration
          user.token = token;
          res.json(user);
        }else{
          res.send("User email or password is not correct!")
        }
      }
    });
  }
})

// get user by email
router.get('/:email',function(req, res) { // params.id
  collection.find({email: req.params.email},function(err,tutor){
    if(err) throw err;
      res.json(tutor);
    });
});

module.exports = router;
