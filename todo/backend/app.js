 
const express= require('express')
const app=express();
const connectDB = require('./config/db')
connectDB();

require('dotenv').config()




//routes
const pageRoutes= require('./routes/pageRoutes')
const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todoRoutes');
const adminRoutes = require('./routes/adminRoutes')
app.use(express.json());


app.use('/',pageRoutes)
app.use('/auth',authRoutes)
app.use('/todos', todoRoutes);
app.use('/admin', adminRoutes);
app.get('/hi', (req, res) => {
  console.log('Home route was accessed.');
  res.send('Welcome to the Home Page!');
});

const PORT= process.env.PORT ||9000;
app.listen(PORT,
  ()=>{
console.log(`Server started at ${PORT}`)
})
