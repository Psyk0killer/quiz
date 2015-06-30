var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Indicamos donde esta nuestro almacen
var sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: 'quiz.sqlite'
});

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//exportar definición de tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa la tabla de preguntas
sequelize.sync().then(function() {
    //then ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count) {
        //Inicializamos la tabla si esta vacia
        if (count === 0) {
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            }).sucess(function() {
                console.log('BBDD inicializada')
            });
        }
    });
});