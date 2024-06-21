import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/UserRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


// --------Basic Server -----------

// app config

const app = express()
const port = process.env.PORT || 4000

// middleware

app.use(express.json())
app.use(cors())

//DB connection
connectDB()

//api endpoints

app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use("/api/order", orderRouter)



app.get("/", (req, res) => {
    res.send("Hello from server")
})

app.listen(port, () => {
    console.log(`Server Connected at http://localhost:${port}`)
})

//mongodb+srv://darshu7375:uFvkMUbihqENrFar@cluster0.ntqwsmb.mongodb.net/?