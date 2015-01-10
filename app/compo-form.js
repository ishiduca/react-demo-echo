'use strict'
var React = require('react')

module.exports = React.createClass({
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
        if (message)  this.props.onCompoFormSubmit(message)
        this.refs.message.getDOMNode().value = ''
        this.refs.message.getDOMNode().focus()
    }
  , componentDidMount: function () {
        this.refs.message.getDOMNode().focus()
    }
})

