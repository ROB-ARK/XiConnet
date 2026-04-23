require('dotenv').config()
const cors = require('cors');
const expres = require('express');
const bodyParse = require('body-parser');
const logger = require('morgan');
//tipo de servidor que realizamos
const http = require('http');
//iniciar y configurar express
const app = expres();
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
//log mostrar informacion de consola
app.use(logger('dev'));
//parsear las entradas de solicitud de datos
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:false}));
//configurar las rutas de bienvenida al servidor
app.get('/',(req,res)=> res.status(200).send({
    message:'Bienvenido al la API de ventas.',
}));
require('./routes/authRoutes')(app);
require('./routes/route_comentarios')(app);
require('./routes/route_usuarios')(app);
require('./routes/route_categorias')(app);
require('./routes/route_negocios')(app);
require('./routes/route_favoritos')(app);
require('./routes/route_reservas')(app);
require('./routes/route_contacto')(app);
//const route_categoria = require('./routes/route_categoria');
//app.use('/categorias',route_categoria);

const port= parseInt(process.env.PORT,10)|| 8000;
app.set('port',port);
const server =http.createServer(app);
server.listen(port);

module.exports = app;