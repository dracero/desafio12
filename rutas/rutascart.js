const express = require('express')
const carritoRouter = express.Router()
let cart = require('../daos/carrito')

carritoRouter.post('/', (req,res, next)=>{
  if (res.locals.authenticated) {
     cart.addcart()
    .then(carro => res.json(carro))
  }else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });
})

carritoRouter.get('/:id/productos', (req,res, next)=>{
   if (res.locals.authenticated) {
       cart.showproducts(req.params.id)
      .then( prodcart =>{ 
                          if (prodcart.length === 0){
                          return res.json({error : 'carrito vacío'})
                        }
                       return res.json(prodcart)
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

carritoRouter.post('/:id/productos', (req,res, next)=>{
  if (res.locals.authenticated) {  
    cart.addproduct(req.params.id,parseInt(req.query.codigo))
  } else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });  
})

carritoRouter.delete('/:id/productos/:id_prod', (req,res, next)=>{
if (res.locals.authenticated) {   
    cart.delproduct(req.params.id,parseInt(req.params.id_prod))
    .then(borrado => borrado !== undefined ? res.json("borrado") : res.json("No encontrado"))
  } else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });   
})

carritoRouter.delete('/:id', (req,res, next)=>{
  if (res.locals.authenticated) {    
    borrado = cart.delcart(parseInt(req.params.id ))
    .then(borrado=> borrado !== undefined ? res.json("borrado") : res.json("No encontrado"))
  } else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });   
})

module.exports = carritoRouter;