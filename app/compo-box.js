'use strict'
var React = require('react')
var shoe  = require('shoe')

var CompoList = require('./compo-list')
var CompoForm = require('./compo-form')

module.exports = React.createClass({
    render: function () {
        return (
            <main id="main">
                <CompoForm onCompoFormSubmit={this.handleCompoFormSubmit} />
                <h2>results</h2>
                <CompoList data={this.state.data} />
            </main>
        )
    }
  , getInitialState: function () {
        var stream = shoe(this.props.url)
        stream
        .on('connect', function () {
            console.log('connect')
        })
        .on('data', function (chnk) {
            var _data
            try {
                _data = JSON.parse(chnk)
            } catch (err) {
                return console.error(err)
            }

            var data = this.state.data
            data.push(_data)

            this.setState({data: data})
        }.bind(this))

        return {
            data: []
          , stream: stream
        }
    }
  , handleCompoFormSubmit: function (message) {
        this.state.stream.write(JSON.stringify({
            method: 'message'
          , value: message
        }))
    }
})
