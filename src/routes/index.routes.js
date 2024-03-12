const { Router } = require('express')
const Todo = require('../schema/TareaSchema.js');
const router = Router()
const jwt = require('jsonwebtoken')
const KEY = process.env.KEY


//middelware de verificación 
const verifyToken = ( req,res,next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({error: "proporcione un token"})
    }

     const updateToken = token.split(' ')[1]
     console.log(updateToken)
        const  verify = jwt.verify(updateToken, KEY)
        req.user = verify
        next()
    }catch (error){
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
}


router.post("/",  async(req,res) => {
   const newTodo = req.body

   try{
      const newTodoInDB = new Todo(newTodo)

        await newTodoInDB.save()

        res.status(201).json({
        message: "tarea creada"
      })
   } catch(error){
      res.status(500).json({ error })

   }
  
})


router.get("/", verifyToken, async(req,res) => {
  try{
    const todos = await Todo.find()
    res.status(200).json({todos})
  }catch (error){
    res.status(500).json({ error })
  }
 
})



router.put('/:id', verifyToken,  async (req,res) => {
   const id = req.params.id

   const newData = req.body

   try{
    const updateTodo = await Todo.findByIdAndUpdate(id, newData)
    
    res.status(200).json({ updateTodo})
   } catch (error) {
    res.status(400).json({ error })
   }
})

router.delete('/:id', verifyToken , async (req,res) => {
  const id = req.params.id
  try{
    const deleteTodo = await Todo.findByIdAndDelete(id)
    res.status(200).json({ deleteTodo })
  }catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
