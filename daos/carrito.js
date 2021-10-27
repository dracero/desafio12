const productos = require('./productos')
const admin = require('../database/firebaseconn');

const db = admin.firestore();

class Cart {
    constructor() {
        this.consulta = db.collection('carrito')
    }
    
    //se crea un carrito vacio
    async addcart() {
       try {
          const carritos = await this.consulta.get();
          const id = carritos.size
          const nuevoElem = {
            id: id+1,
            timestamp: Date.now(),
            productos: [{id:0}]
           }
          await this.consulta.add(nuevoElem);
          return nuevoElem
      } catch (error) {
          throw new Error(`Error al guardar: ${error}`)
      }
    }

  async addproduct(id,id_prod){
     try {
        let newProduct = await productos.getById(id_prod)
        const carro = await this.consulta.doc(id).get();
        let cart = carro.data()
        if (cart.id !==""){
               //let index =  cart.productos.findIndex(x => x.id == id_prod);//es para ver si el producto existe
               console.log()
               if(newProduct.length > 0){ //me fijo si el producto existe 
                        const newProd = { id: id_prod}
                        cart.productos.push(newProd)
                        const actualizado = await this.consulta.doc(id).set(cart)
                        return actualizado
                } else return ("El producto no existe")
        }else  return ("El carrito noe existe")
      } catch{
        throw new Error('Primero hay que crear un carrito') 
      } 
    }

    async showproducts(id){
      try {
        const doc = await this.consulta.doc(id).get();
        if (!doc.exists) {
            throw new Error(`Error al listar por id: no se encontró`)
        } else {
            const data = doc.data();
            return { ...data, id }
        }
    } catch (error) {
        throw new Error(`Error al listar por id: ${error}`)
    }
    }

    async delproduct(id,id_prod){
      try {
        const carro = await this.consulta.doc(id).get();
        let cart = carro.data()
        if (cart.id !==""){
               let index =  cart.productos.findIndex(x => x.id == id_prod);
               if(index !== -1) { //me fijo si el producto está en el carrito
                  console.log(index)
                  cart.productos.splice(index,1);
                  const borrado = await this.consulta.doc(id).set(cart)
                  return borrado
                } else return undefined
        }else  return undefined
      } catch{
        throw new Error('Primero hay que crear un carrito') 
      } 
    }
 
   
    async delcart(id){
        try{ 
          await consulta.doc(id).delete()
          return ("Se borró el carrito")
        } catch{
         throw new Error('producto no encontrado o carrito no encontrado') 
        }      
     }

}

 module.exports = new Cart();