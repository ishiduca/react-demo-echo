'use strict'
var path    = require('path')
var express = require('express')
var app     = express()

var pack    = require('./package')
var config  = pack.config
var port    = process.env.PORT || config.server.port
var root    = path.join( __dirname, config.static.root)

var dashboard = require('dashboard')
var app_sock  = require('app-sock')

app.use(express.static(root))
app.use(dashboard)

app_sock.install(app.listen(port), config.sock.url)

console.log('[process.pid - %s]', process.pid)
console.log('[server start to listen on port %s]', port)
