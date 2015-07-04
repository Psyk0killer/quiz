//Controlador para preguntas

//importamos el modelo 
var models = require('../models/models.js');


// Autoload - factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
    models.Quiz.findById(quizId).then(
        function(quiz){
            if(quiz){
                req.quiz = quiz;
                next();
            }else{
                next(new Error('No existe quizId='+ quizId));
            }
        }
    ).catch(function(error){ next(error); });
};

// GET /quizes
exports.index = function(req, res){
    var search = ("%"+(req.query.search||"")+"%").replace(' ', '%');
    models.Quiz.findAll({
        where: [" lower(pregunta) like lower(?)", search ]
    }).then(function(quizes){
        res.render('quizes/index.ejs', { quizes: quizes });
    }).catch(function(error){ next(error); });
};

// GET /quizes/:id
exports.show = function(req, res) {
    models.Quiz.findById(req.params.quizId).then(function(quiz){
        res.render('quizes/show', { quiz: req.quiz});
    });
    /*
    models.Quiz.findAll().then(function(quiz) {
        res.render('quizes/question', {
            pregunta: quiz[0].pregunta
        });
    })
    */
};

// GET /quizes/answer
exports.answer = function(req, res) {
    models.Quiz.findById(req.params.quizId).then(function(quiz){
        var resultado = 'Incorrecto';
        if (req.query.respuesta === req.quiz.respuesta) {
            resultado = 'Correcto';
        }
        res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
    });
    /*
    models.Quiz.findAll().then(function(quiz) {
        if (req.query.respuesta === quiz[0].respuesta) {
            res.render('quizes/answer', {
                respuesta: 'Correcto'
            });
        } else {
            res.render('quizes/answer', {
                respuesta: 'Incorrecto'
            });
        }
    })
    */
}

// GET /author
exports.author = function(req, res) {
    res.render('quizes/author');
}