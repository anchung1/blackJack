var React = require('react');
var io = require('socket.io-client');
var action = require('../actions/sampleActions');
var store = require('../stores/sampleStore');

var socket = io();

function setupWebSocket() {
    socket.on('connect', function() {
        console.log("connected");
    });

    socket.on('event', function(msg) {
        action.socketMsg(msg);
    });
}

//io('https://localhost:30001');
//https://www.npmjs.com/package/socket.io-client
var SampleContainer = React.createClass({
    getInitialState: function() {

        return {
            holaMsg: ''
        };
    },

    componentDidMount: function() {
        store.addSockMsgListener(this._sockCB);

        setupWebSocket();
        this.refs.input.getDOMNode().focus();
    },

    componentWillUnmount: function() {
        store.removeSockMsgListener(this._sockCB);
    },

    keypress: function(event) {
        if (event.which == 13) {
            var value = this.refs.input.getDOMNode().value;
            /*console.dir(socket);*/

            socket.emit('event', value);
        }
    },

    _sockCB: function() {
        var msg = store.getSockMsg();
        this.setState({
            holaMsg: msg
        });
        console.log(msg);
    },

    render: function(){
        var msg = <div></div>;
        if (this.state.holaMsg) {
            msg = <div>{this.state.holaMsg}</div>;
        }

        return (
            <div>
                <h3>Hello World</h3>
                <input type="text" placeholder="Enter Text" ref="input" onKeyPress={this.keypress}/>
                {msg}
            </div>
        )
    }
});

module.exports = SampleContainer;