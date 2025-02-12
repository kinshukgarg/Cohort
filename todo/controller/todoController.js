const Todo = require("../models/todo");

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }

    // user id from authentication middleware

    const userId = req.user.userId;
    if(!userId)
    {
      return res.status(401).json({error:"User not accessed"})
    }
    const newTodo = new Todo({ title, user: userId });
    const saveTodo = await newTodo.save();
    return res.status(210).json({ saveTodo });
  } catch (err) {
    console.error("create Todo error", err);
    return res.status(500).json({ error: "Servor error" });
  }
};

// Get all todos for the logged in user

exports.getTodos = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todos = await Todo.find({ user: userId });
    return res.json(todos);
  } catch (err) {
    console.error("Get todos error", err);
    return res.status(500).json({ error: "Servor error" });
  }
};

// single Todo by its ID (only if it nelomgs to user )

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const todo = await Todo.findOne({ _id: id, user: userId });
    if (!todo) {
      return res.status(404).json({ error: "todo not found" });
    }
    return res.json(todo);
  } catch (err) {
    console.error("get todo by id error", err);
    return res.status(500).json({ error: "Servor error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const userId = req.user.userId;
    const updateTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { title, completed },
      { new: true, runValidators: true }
    );
    if (!updateTodo) {
      return res.status(404).json({ error: "todo not found " });
    }
    return res.json(updateTodo);
  } catch (err) {
    console.error("Update Todo error", err);
    return res.status(500).json({ error: "Servor error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json({ message: "todo deleted sucessfully" });
  } catch (err) {
    console.error("Deleted Todo error", err);
    return res.status(500).json({ error: "servor error" });
  }
};
