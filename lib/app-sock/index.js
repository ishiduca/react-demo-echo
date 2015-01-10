'use strict'
var shoe      = require('shoe')
var Transform = require('./transform')

var transf = new Transform

var sock = module.exports = shoe(function (stream) {
    stream.pipe(transf).pipe(stream)

    stream.on('close', remove)
    stream.on('end',   remove)

    transf.send({
        method: 'connected'
      , value:  String(stream) + ' connected'
    })

    function remove () {
        transf.send({
            method: 'un connected'
          , value:  String(stream) + ' un connected'
        })
    }
})
