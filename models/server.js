const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

class Server {
    constructor() {
        this.app = express()
        this.usuariosPath = "/"
        this.middlewares()
        this.routes();
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
        this.app.listen(8080, () => {
            console.log('servidor corriendo en el puerto 8080')

        })
    }

}

module.exports = Server;