const mongoose = require('mongoose');
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI

const connection = async () => {

    try{
        await mongoose.connect(MONGO_URI)
        console.log('La conexión funciono de manera exitosa')
    }catch(error) {
        console.error(error)
    }
 
}

 module.exports = connection