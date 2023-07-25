const express = require('express')
const cors = require('cors');
const body = require('body-parser');
const bodyParser = require('body-parser');
const {dbConection} = require('../database/config')


class Server {
    constructor() {
        this.app = express()
        this.app.port = process.env.PORT
        this.usuariosPath = "/"
        this.middlewares()
        this.routes();
        this.conectarDB()
    }
    async conectarDB(){
        await dbConection();
    }
    middlewares() {

        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(express.static('public'))
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        // this.app.get('/api', function (req, res) {
        //     res.json({
        //         mensaje: 'soy un msj de la api usuarios',
        //         nombre: 'Nicole Romero',
        //         email: 'nicoleromer@gmail.com'
        //     })
        //   })
    }
    listen() {
        this.app.listen(this.app.port, () => {
            console.log('server online', this.app.port)
            // console.log('servidor corriendo en el puerto 8080')
        })
    }

}

module.exports = Server;