const express = require('express');
const app = express();

app.use(express.json());


let todos = [];


app.get('/todos', (req, res) => {
  res.json(todos);
});


app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((item) => item.id === id);

  if (todo) {
    res.json(todo);
  } else {
  
    res.status(400).json({ error: 'Todo not found' });
  }
});

  
app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
  const newTodo = { id: newId, title, completed: false };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});


app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, completed } = req.body;

  const todoIndex = todos.findIndex((item) => item.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  
  if (title !== undefined) {
    todos[todoIndex].title = title;
  }
  if (completed !== undefined) {
    todos[todoIndex].completed = completed;
  }

  res.json(todos[todoIndex]);
});


app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((item) => item.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.slice(todoIndex, 1);
  res.json(deletedTodo[0]);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
