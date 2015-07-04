var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* Autoload de comandos con :quizId*/
router.param('quizId', quizController.load); 

/* GET indice*/
router.get('/quizes', quizController.index);
/* GET quizes/questions */
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* GET quizes/answer */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
/* GET author*/
router.get('/author', quizController.author);

module.exports = router;
