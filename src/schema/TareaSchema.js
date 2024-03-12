const mongoose = require ('mongoose')

const tareas = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: Boolean,
        required: true,
        default: false 
    },
})

const ModelTareas = mongoose.model("todo", tareas)


module.exports = ModelTareas;