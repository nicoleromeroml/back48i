// //console.log('Hola Backend');

// const express = require('express') //Importamos express

// // Para poder usarla creamos una constante llamada app y le asignamos como valor todo lo que viene de la libreria de express
// const app = express() 

// //Para poder acceder a un metodo de express utilizamos .get, es cuando queremos hacer una petición
// //Tenemos que decirle a que ruta queremos hacerle la peticion, en este caso es el localhost nuestra direccion raiz '/'
// //Luego accede al callback con dos metodos req(request: lo que recibe el servidor de afuera) y res(response: lo que devuelve el servidor)
// app.get('/', function (req, res) {
//   res.send('Alo alo alo') //Nuestra respuesta con el metodo send, envia el mensaje, send devuelve un mensaje de texto plano
// })

// app.listen(3000) //listen es a que puerto esta escuchando


//!Exportamos la clase server
const Server = require('./models/server');

require('dotenv').config();

//!Para crear la instancia de la clase
const server = new Server(); //tiene las variables, funcion de ruteo, listen, etc

//!Para poder ejecutar nuestro servidor
server.listen();