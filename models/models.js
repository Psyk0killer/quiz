var path = require('path');

//POSTGRES DATABASE_URL = postgres://user:passwd@host:port/database
//SQLITE DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

console.log(protocol);
console.log(dialect);

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Indicamos donde esta nuestro almacen
var sequelize = new Sequelize(DB_name, user, pwd, {
    dialect: dialect,
    protocol : protocol,
    port: port,
    host: host,
    storage: storage, //solo SQLite (.env)
    omitNull: true  // solo Postgres
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