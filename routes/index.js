var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});

/* Autoload de comandos con :quizId*/
router.param('quizId', quizController.load);

/* GET indice */
router.get('/quizes', quizController.index);
/* GET quizes/questions */
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* GET quizes/answer */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
/* GET author*/
router.get('/author', quizController.author);
/* GET quizes/new */
router.get('/quizes/new', quizController.new);
/* POST quizes/create */
router.post('/quizes/create', quizController.create);
/* GET quizes/:quizId/edit */
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
