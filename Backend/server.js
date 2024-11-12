import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import trainerRoutes from './routes/trainerRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173'})) //allow frontend to connect with the backend

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/trainer',trainerRoutes)

//api endpoints
app.get('/',(req,res) => {
    res.send('API WORKING');
})


app.listen(port,() => console.log("Server started on",port))