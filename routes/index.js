var express = require('express');
var router = express.Router();

let MovieStories = require('../movieStories');
let movieStories = new MovieStories();


/* GET home page. */
router.get('/', function (req, res, next) {
	return res.redirect('/movies');
});

router.get('/movies',function(req, res, next){
	return res.send(movieStories.all());
});

router.get('/movies/:title',function(req, res, next){
	let foundMovies = movieStories.find(req.params.title);
	if(foundMovies.length <1)
	{
		res.statusCode = 404;
		return res.send({
			 message: 'Khong co phim can tim'
		});
	}
	return res.send({
		message:'Ket qua tim kiem',
		payload: foundMovies.pop()
	});
});

router.put('/movies/:title',function(req, res, next){

	if(!movieStories.update(req.params.title, req.body)){
		res.statusCode = 500;
		res.send({
			message: 'Cap nhat that bai'
		});
	}

	return res.send({
		message:'Cap nhat thanh cong'
	});
});

router.delete('/movies/:title',function(req, res, next){

	if(!movieStories.has(req.params.title)){
		res.statusCode = 500;
		res.send({
			message: 'Khong tim thay movie'
		});
	}
	movieStories.remove(req.params.title);
	return res.send({
		message:'Xoa thanh cong'
	});
});

router.post('/movies', function(req, res, next){
	if(!req.body.Title || req.body.Title.trim().length < 1)
	{
		res.statusCode = 400;
		return res.send({
			message:'chua co hoac thieu tieu de.'
		});
	}

	if(movieStories.has(req.body.Title))
	{
		res.statusCode = 400;
		return res.send({
			message: 'Phim da co.'
		});
	}

	movieStories.add(req.body);
	return res.send({
		message:'da them thong tin'
	});
});

module.exports = router;
