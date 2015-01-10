'use strict'
var React = require('react')
var Compo = require('./compo')

module.exports = React.createClass({
    render: function () {
        var results = this.props.data
        return (
            <div id="result-list">
                {results.map(function (res) {
                    return <Compo key={res.id} data={res} />
                })}
            </div>
        )
    }
})
