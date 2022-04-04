const express = require('express')
const path = require('path')
const cookieparser = require('cookie-parser')
const helmet = require('helmet')

const routes = require('./routes')

const app = express()

app.use(helmet())
app.use(cookieparser())

// express server to process POST request rendered by the ejs files
app.use(express.json)
app.use(express.urlencoded({ extended: false }))

// setup express server to read/render static css
app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('view engine', 'ejs')

// render ejs
app.set("views", path.join(__dirname, 'views'))

const PORT = process.env.PORT || 3000

//routes
app.use('/', routes)

app.listen(PORT, () => console.log(`server running! port: ${PORT}`));