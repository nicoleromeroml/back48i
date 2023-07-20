      //  const express = require('express') //reemplaza a la importacion del front

       // const app = express() //accedemos a todas las propiedades y metodos que tiene la libreria express

        //llamando a la ruta raiz
        // app.get('/', function (req, res) {
        //   res.send('Hola comision de la 48i backend!!')
        // })

      //  app.listen(8080)

const Server = require('./models/server');
const server = new Server();

server.listen()


