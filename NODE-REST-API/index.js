const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes')
const authRoute = require('./routes/authRoutes')

dotenv.config();

mongoose.connect(process.env.CONNECTION_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
},()=>{
    console.log("Connected to Mongo DB")
});

// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Backend server is running! on ${port}`)
})