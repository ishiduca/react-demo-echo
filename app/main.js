'use strict'
var React = require('react')
var shoe  = require('shoe')

var Compo = React.createClass({
    render: function () {
        return (
            <li className="result">
                <p className="message">{this.props.data.value}</p>
                <span className="meta">{this.props.data.method}</span>
            </li>
        )
    }
})

var CompoList = React.createClass({
    render: function () {
        var results = this.props.data
        return (
            <ul id="result-list">
                {results.map(function (res) {
                    return <Compo key={res.id} data={res} />
                })}
            </ul>
        )
    }
})

var CompoForm = React.createClass({
    render: function () {
        return (
            <div id="l-message-form">
                <form id="message-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        id="message"
                        placeholder="input message"
                        required
                        ref="message"
                    />
                </form>
            </div>
        )
    }
  , handleSubmit: function (ev) {
        ev.preventDefault()

        var message = this.refs.message.getDOMNode().value.trim()
        if (! message) return

        this.props.onCompoFormSubmit(message)

        this.refs.message.getDOMNode().value = ''
    }
})

var CompoBox = React.createClass({
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

React.render(
    <CompoBox url="/echo" />
  , document.querySelector('#content')
)
