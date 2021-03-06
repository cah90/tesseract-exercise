const express = require('express')
const nunjucks = require('nunjucks')

const routes = require('./routes')

const server = express()

server.use(express.static('public'))
server.use(routes)
server.set('view engine', 'njk')

nunjucks.configure('src/views', {
  express: server,
  autoescape: false,
  noCache: true 
})

server.listen(3000, () => {
  console.log("Server is on")
})