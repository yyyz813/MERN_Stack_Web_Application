var express = require('express');
var router = express.Router();

var monk = require('monk');
const { response } = require('express');
var db = monk('localhost:27017/FinalProject')
var collection = db.get('users');

// base url localhost:3000/users
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  collection.find({},function(err, allTutors){
    if(err) throw err;
      res.json(allTutors);
    });
});

/* GET users by email. */
router.get('/:email', function(req, res, next) {
  // res.send('respond with a resource');
  collection.find({email: req.params.email},function(err, allTutors){
    if(err) throw err;
      res.json(allTutors);
    });
});

//update
router.put('/:email', function(req, res) {
	collection.update({ email: req.params.email }, { $set: { 

		favlist: req.body.favlist,

	 }},  function(err, users){
		if (err) throw err;
	  	res.json(users);
	});
});

module.exports = router;
