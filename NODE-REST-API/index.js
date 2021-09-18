const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes')
const authRoute = require('./routes/authRoutes')
const postRoute = require('./routes/postRoutes')
const connectDb = require('./db')

dotenv.config();

connectDb()

// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Backend server is running! on ${port}`)
})