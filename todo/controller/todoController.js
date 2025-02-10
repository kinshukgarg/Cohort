const Todo= require('../models/todo')

exports.getAllTodos=async(req,res)=>{
    try{
        const todos= await Todo.find();
        res.json(todos);
    }catch (error)
    {
        res.status(500).json({error:'server error'})
    }
}
exports.createTodo = async (req,res)=>{
    try{
        const {title}=req.body;
        if(!title){
            return res.status(400).json({error:'Title is required'})
        }
        const newTodo = new Todo({
            title,completed:false
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    }catch(error)
    {
        res.status(500).json({erro:'server error'})
    }
};