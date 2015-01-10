'use strict'
var React = require('react')

module.exports = React.createClass({
    render: function () {
        return (
            <li className="result">
                <p className="message">{this.props.data.value}</p>
                <span className="meta">{this.props.data.method}</span>
            </li>
        )
    }
})
