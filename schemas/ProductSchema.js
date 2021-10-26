const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    ind: { type: Number, required: true},
    timestamp: { type: Date, required: true},
    nombre: { type: String, required: true},
    descripcion: { type: String, required: true},
    codigo: {type: Number, required: true},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
})

module.exports = mongoose.model('Product',ProductSchema)
