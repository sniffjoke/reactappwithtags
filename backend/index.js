const express = require('express')
const colors = require('colors')
const {errorHandler} = require("./middlewares/errorMiddleware");
const connectDB = require("./db/db");
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const cookieParser = require("cookie-parser");

connectDB()

const app = express()




app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.urlencoded({extended: false}))

app.use('/api/notes', require('./routes/notesRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
