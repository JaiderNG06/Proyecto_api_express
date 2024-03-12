const express = require ('express');
require("dotenv").config()
const app = express();
const router1 = require('./routes/index.routes.js');
const modelUser = require('../src/schema/User.js')
const connection = require('../src/db/db.js')
const jwt = require('jsonwebtoken')
const KEY = process.env.KEY
connection()


const PORT = 4000   

app.use(express.json())

app.get("/inicio", (req, res) => {
    res.send("Bienvenidos a la Api de Jaiderdev");
  });


  app.post  ('/login',  async (req,res) => {
    const {username, password} = req.body;

    const usuario = await modelUser.findOne({username, password})


    if (!usuario) 
    return res.status(404).json({ error : "usuario no esta registrado"})
    

    const generarToken = jwt.sign({
       username
    }, KEY)
    
    res.header('authorization', generarToken).json({
        data: {token: generarToken,
        username : req.body.username
        }
    })
})


app.post ('/registro', async (req, res) => {
    const { username, password } = req.body;

    
    const usuario = new modelUser({ username: username, password: password });

        await usuario.save()

    if (!usuario) {
        return res.status(400).json({ message: "Error al registrar usuario" });
    }

    const generarToken = jwt.sign({
        username
    }, KEY);

    res.header('authorization', generarToken).json({
        data: { token: generarToken }
    });
});





app.use("/todos", router1)




app.listen(PORT, () => 
    console.log('servidor activado con exito en el puerto 4000')
);
