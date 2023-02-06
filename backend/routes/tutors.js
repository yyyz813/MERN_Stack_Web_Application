var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');


/* all case sensitive*/
var monk = require('monk'); // method
var db = monk('localhost:27017/FinalProject');
const bcrypt = require("bcrypt");// hash password
var collection = db.get('pokemons');


// base url localhost:3000/allTutorsList
router.get('/',function(req, res) {
  collection.find({},function(err, allTutors){
    if(err) throw err;
      res.json(allTutors);
    });
});

// get item by name
router.get('/:name',function(req, res) { // params.name
    collection.find({name: req.params.name},function(err,tutor){
      if(err) throw err;
        res.json(tutor);
      });
});

// get item by email
router.get('/getByEmail/:email',function(req, res) { 
  collection.find({email: req.params.email},function(err,tutor){
    if(err) throw err;
      res.json(tutor);
    });
});

// create an item
router.post('/',function(req, res) { // params.id
    const salt = bcrypt.genSaltSync(10); // generate random prefix
    const hashedpwd = req.body.password ? bcrypt.hashSync(req.body.password, salt) : -1
    var newTutor = {
      username: req.body.username,
      email: req.body.email,
      password: hashedpwd,
      name: req.body.name,
      subject: req.body.subject,
      description: req.body.description,
      rating: req.body.rating,
      available: req.body.available,
      img:req.body.img,
      comment:req.body.comment
    }
    collection.insert(newTutor,function(err,tutor){
        if(err) throw err;
          res.json(tutor);
    });
});

// update an item
router.put('/:name',function(req, res) { // params.id
    collection.update({name:req.params.name},{$set:{
        name: req.body.name,
        subject: req.body.subject,
        description: req.body.description,
        rating: req.body.rating,
        available: req.body.available,
        img:req.body.img
    }},function(err,tutor){
      if(err) throw err;
        res.json(tutor);
      });
});

// self update tutor
router.put('/selfUpdate/:name',function(req, res) { // params.id
  collection.update({name:req.params.name},{$set:{
      name: req.body.name,
      subject: req.body.subject,
      description: req.body.description,
      img:req.body.img
  }},function(err,tutor){
    if(err) throw err;
      res.json(tutor);
    });
});

// update a tutor comment
router.put('/comments/:name',function(req, res) { // params.id
  collection.update({name:req.params.name},{$set:{
      comment:req.body.comment,
      rating:req.body.rating
  }},function(err,tutor){
    if(err) throw err;
      res.json(tutor);
    });
});

// delete an item
router.delete('/:name',function(req, res) { // params.id
    collection.remove({name:req.params.name},function(err,tutor){
      if(err) throw err;
        res.json(tutor);
      });
});
//delete by id
// router.delete('/:id',function(req, res) { // params.id
//   collection.remove({_id:req.params.id},function(err,tutor){
//     if(err) throw err;
//       res.json(tutor);
//     });
// });

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

module.exports = router;