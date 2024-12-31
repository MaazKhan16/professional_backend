import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { router } from "./routes/auth.js";
const app = express();



app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}))

//middleware
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static('public'))
app.use(cookieParser())
// app.use(router)

import userRouter from "./routes/user.routes.js"
app.use('/api/v1/users', userRouter)


export { app };