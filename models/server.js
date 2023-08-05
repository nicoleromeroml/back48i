const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth'
        this.usersPath = '/api/usuarios';
        this.categoriasPath = "/api/categorias";
        //conectar con base de datos
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Leer lo que envia el usuario por cuerpo de la peticion
        this.app.use(express.json());

        //carpeta publica donde vamos a montar nuestras paginas web
       this.app.use(express.static('public'));
    }

    //para hacer la peticion creamos una funcion
    //esta funcion va a manejar todas las rutas que necesitemos de nuestro servidor
    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require ('../routes/usuarios'));
        this.app.use(this.categoriasPath, require('../routes/categorias'));
    }

    //para escuchar el puerto creamos otra funcion
    listen(){
        this.app.listen(this.port, () => {
            console.log('Server online port:', this.port);

        })
    }
}

module.exports = Server; //es como el export default (frontend) pero en backend