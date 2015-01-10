'use strict'
var stream = require('stream')
var util   = require('util')
var uuid   = require('uuid')

function Tra () {
    stream.Transform.call(this)
}

util.inherits(Tra, stream.Transform)
module.exports = Tra

Tra.prototype._transform = function (chnk, enc, done) {
    var data
    try {
        data = JSON.parse(chnk)
    } catch (err) {
        console.log(err)
        data = {
            method: 'error'
          , value: String(err)
        }
    }

    this.send(data)
    done()
}
Tra.prototype.send = function (data) {
    data.id = uuid.v1()
    this.push(JSON.stringify(data))
}
