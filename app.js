const config = require('./utils/config')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to:', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then( () => logger.info('connected to MongoDB'))
  .catch( error => logger.error('error in connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

const FRONTEND_PATH = path.resolve(__dirname, './dist')
const INDEX_PATH = path.resolve(FRONTEND_PATH, 'index.html')
app.use(express.static(FRONTEND_PATH))
app.get('/', (_req, res) => res.sendFile(INDEX_PATH))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app