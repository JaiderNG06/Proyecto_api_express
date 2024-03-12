const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({

    username: { type: String, required: true},
    password: { type: String, required: true}
    
  });

const modelUser = mongoose.model('Usuario', usuarioSchema);

module.exports = modelUser; 