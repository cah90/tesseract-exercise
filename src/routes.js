const express = require('express')
const routes = express.Router()

const users = require("./controllers/users")

module.exports = routes

routes.get("/", users.index)
//routes.get("/search", users.search)
//routes.get("/users/:login", users.user)