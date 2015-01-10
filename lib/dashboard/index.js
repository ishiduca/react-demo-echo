'use strict'
var express = require('express')
var app     = module.exports = express()
var params  = require('./params')

app.set('views', __dirname)
app.set('view engine', 'hjs')

app.get('/', function (req, res) {
	res.render('dashboard', params)
})
