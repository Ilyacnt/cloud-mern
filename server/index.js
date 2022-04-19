const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/auth.routes')
const fileRouter = require('./routes/file.routes')
const app = express()
const PORT = process.env.PORT || config.get('serverPort')
const MONGO_URL = config.get('mongoUrl')
const corsMiddleware = require('./middlewares/cors.middleware')


app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)


const start = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        app.listen(PORT, () => {
            console.log('Server started on PORT: ' + PORT);
        })
    } catch (error) {
        console.log(error)
    }
}


start()