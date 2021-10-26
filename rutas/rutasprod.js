const express = require('express')

const router = express.Router()
const productos = require('../daos/productos')

router.get('/', (req, res, next) => {
  productos.getAll()
  .then(prods =>{
  (prods.length === 0) ? next({ code: 404, message: 'No hay productos cargados' }): res.json(prods)
 });
});

router.get('/:id', (req, res, next) => {
if (res.locals.authenticated) { 
  const { id } = req.params
  productos.getById(id)
  .then ( producto =>
    (producto === undefined) ? next({ code: 404, message: 'No se encontro el producto' }): res.json(producto)
  )  
 }else res.json({
  error: {
    'status': -1,
    'ruta': req.path,
    'implementada': 'No implementada',
    'metodo': 'No implementados'
   }
 }); 
})

router.post('/', (req, res, next) => {
 if (res.locals.authenticated) {  
  productos.guardar(
    req.query.nombre,
		req.query.descripcion,
		req.query.codigo,
    req.query.foto,
		req.query.precio,
		req.query.stock
  ).then( producto => res.json(producto))
 }else res.json({
  error: {
    'status': -1,
    'ruta': req.path,
    'implementada': 'No implementada',
    'metodo': 'No implementados'
  }
});
})

router.put('/:id', (req, res, next) => {
  if (res.locals.authenticated) {  
    const { id } = req.params
    productos.update(
		id,
		req.query.nombre,
		req.query.descripcion,
		req.query.codigo,
    req.query.foto,
		req.query.precio,
		req.query.stock
	  ).then( producto =>{
	  if (producto === undefined) throw new Error('producto no encontrado')
	  else res.json(producto)
    })
  }else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });  
})

router.delete('/:id', (req, res, next) => {
if (res.locals.authenticated) {   
  const { id } = req.params
	productos.delById(id)
  .then( producto => {
	if (producto === undefined) throw new Error('producto no encontrado')
	else res.json(producto)
  })
}else res.json({
  error: {
    'status': -1,
    'ruta': req.path,
    'implementada': 'No implementada',
    'metodo': 'No implementados'
  }
}); 
})

module.exports = router
