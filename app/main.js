'use strict'
var React     = require('react')
var CompoBox  = require('./compo-box')

React.render(
    <CompoBox url="/echo" />
  , document.querySelector('#content')
)
