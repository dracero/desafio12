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
            productos:[]
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
        let carro = await this.showproducts(id)
        if (carro.id !==""){
               let index =  carro.productos.findIndex(x => x.id == id_prod);
               if(newProduct && index === -1){ //me fijo si el producto existe y si no está en el carrito
                        carro.productos.push(newProduct)
                        await this.consulta.doc(carro.id).update(carro);  
                } else return ("El producto ya está en el carrito")
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
        let oldProduct = await productos.getById(id_prod)
        let carrito = await this.showproducts(id)
        if ( carrito.constructor === objectConstructor){
               let docRef = this.consulta.doc(id)
               let index =  docRef.productos.findIndex(x => x.id == id_prod);
               if(oldProduct && index !== -1){ //me fijo si el producto existe y si no está en el carrito
                  docRef.productos.splice(index,1);
                  await docRef.set({
                    timestamp: Date.now(),
                    productos: docRef.productos,
                   });
                  return (" Se borró", oldProduct)
                } else return ("El producto no está en el carrito")
        }else  return ("El carrito noe existe")     
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