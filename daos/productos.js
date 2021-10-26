const productMD = require ('../schemas/ProductSchema') //importo la conexion knexMysql como knex
require('../database/connection')

class Producto {   
  constructor(){
        //clase de producto, acá se conectaba a los archivos
        this.coleccion = productMD;
    }

    async guardar(nombre, descripcion, codigo, foto, precio, stock) {
      try {
        let docs = await this.coleccion.find({}, { __v: 0 }).lean()
        let nuevoProducto= {
          ind: docs.length+1,
          timestamp: Date.now(),
          nombre: nombre,
          descripcion: descripcion,
          codigo: codigo,
          foto: foto,
          precio: precio,
          stock: stock
          }   
          let doc = await this.coleccion.create(nuevoProducto);
          return doc
      } catch (error) {
          throw new Error(`Error al guardar: ${error}`)
      }
  }
  
    async update(ind, nombre, descripcion, codigo, foto, precio, stock){
       try{ 
        let updateProducto= {
          timestamp: Date.now(),
          nombre: nombre,
          descripcion: descripcion,
          codigo: codigo,
          foto: foto,
          precio: precio,
          stock: stock
        }
        const { n, nModified } = await this.coleccion.findOneAndUpdate({ 'ind': ind }, updateProducto)
          if (n == 0 || nModified == 0) {
              throw new Error('Error al actualizar: no encontrado')
          } else {
              return updateProducto
          }
      } catch (error) {
          throw new Error(`Error al actualizar: ${error}`)
      }
    }     

    async getAll(){
      try {
        let docs = await this.coleccion.find({}, { __v: 0 }).lean()
        return docs
    } catch (error) {
        throw new Error(`Error al listar todo: ${error}`)
    }
  }

    async getById(ind){
      try {
        let docs = await this.coleccion.find({ 'ind': ind },{ __v: 0 }).lean()
        return docs
    } catch (error) {
        throw new Error(`Error al listar todo: ${error}`)
    }
    }

    async delById(ind){
      try{  
        const product = await this.getById(ind)
        if(!product) return undefined
         await productMD.deleteOne({'ind': ind },{ __v: 0 })
         return product
        } catch{
        throw new Error('producto no encontrado') 
        } 
    }

}

module.exports = new Producto()