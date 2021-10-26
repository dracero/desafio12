const express = require('express')
const cors = require('cors')
const compression = require('compression');
  require('./database/firebaseconn')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())

//administrador con res.locals seteo la booleana para poder usar los métodos
let administrador = true;
app.use((req, res, next) => {
    res.locals.authenticated = administrador;
  next();    
  });

//Rutas
app.use('/api/productos', require('./rutas/rutasprod'))
app.use('/api/carrito', require('./rutas/rutascart'))

// Middleware para manejar rutas no implementadas
app.use((req, res)  => {
   res.json({
          error: {
            'status': -2,
            'ruta': req.path,
            'implementada': 'No implementada',
            'metodo': 'No implementados'
          }
        });
  });
// Middleware para manejar errores  
app.use((error, req, res, next) => {
   res.status(error.code || 500).json({ error : error.message })
})

const puerto = 8080

const server = app.listen(process.env.PORT || puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`)
})

server.on('error', error => {
  console.log('error en el servidor:', error)
})
