var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/FinalProject');
var collection = db.get('appointments');

//base url: http://localhost:3000/allAppointments

router.get('/', function(req, res) {
	collection.find({}, function(err, videos){
		if (err) throw err;
	  	res.json(videos);
	});
});

router.get('/getCount', function(req, res) {
	collection.count({}, function(err, count){
		if (err) throw err;
		res.json(count)
	})
});

router.get('/:id', function(req, res) {
	collection.find({ id: req.params.id }, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

//get apt by tutor
router.get('/getTutor/:tutor', function(req, res) {
	collection.find({ tutor: req.params.tutor }, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

//insert
router.post('/', function(req, res) {
	collection.insert({
		id: req.body.id,
		start: req.body.start,
		end: req.body.end,
		tutor: req.body.tutor,
		student: req.body.student,
		
	}, function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

//update
router.put('/:id', function(req, res) {
	collection.update({ _id: req.params.id }, { $set: { 
		title: req.body.title,
		genre: req.body.genre,
		description: req.body.desc

	 }},  function(err, video){
		if (err) throw err;
	  	res.json(video);
	});
});

//delete
router.delete('/:id', function(req, res) {
	collection.remove({ id: req.params.id }, function(err, video){
		if (err) throw err;
		console.log(video);
	  	res.json(video);
	});
});

module.exports = router;
