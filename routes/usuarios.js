const {Router} = require ('express');

//en vez de usar app ahora usamos router
const router = Router();

//la peticion get es cuando desde el back le pedimos info al front
router.get('/', function (req, res){

    const {apiKey, limit} = req.query;

    res.json({
        message: "Get users",
        apiKey,
        limit
    })
});

//desde el front le decimos que guardamos datos para almacenarlos en el back
router.post('/', function (req, res){

//como hacermos para recibir el cuerpo de la peticion, hay que habilitarlo en middlewares
    const body = req.body;

    res.json({
        message: "Post users",
        body
    })
});

//sirve para actualizar datos, junto con el path va con un id
router.put('/:id', function (req, res){
    res.json({
        message: "Put users",
    })
});

//borra info, va con id tambien
router.delete('/:id', function (req, res){
    res.json({
        message: "Delete users",
    })
});

module.exports = router;

//Desde el servidor vamos a decirle que apunte a esta ruta