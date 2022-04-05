const express = require('express')
const path = require('path')
const helmet = require('helmet')
const cookieparser = require('cookie-parser')
const routes = require('./routes')

const app = express()

// allow cookieparser
app.use(helmet())
app.use(cookieparser())

// process POST request render ejs
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// static css
app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('view engine', 'ejs')

// render ejs
app.set('views', path.join(__dirname, 'views'))

//routes
app.use('/', routes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`server started on port: ${PORT}`))