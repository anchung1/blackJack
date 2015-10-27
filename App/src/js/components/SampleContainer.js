var React = require('react');
var io = require('socket.io-client');
var action = require('../actions/sampleActions');
var store = require('../stores/sampleStore');

var socket = io();

function setupWebSocket() {
    /*console.dir(io);
    console.dir(socket);*/
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

    keypress: function(refId, event) {
        var ref = {};
        var wsEvent = '';

        if (event.which == 13) {
            if (refId == 'input') {
                ref = this.refs.input;
                wsEvent = 'event';
            }

            if (refId == 'gameRoomInput') {
                ref = this.refs.gameRoomInput;
                wsEvent = 'room';
            }

            var value = ref.getDOMNode().value;
            ref.getDOMNode().select();

            /*console.dir(socket);*/

            socket.emit(wsEvent, value);
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
        var msg = <div>{this.state.holaMsg}</div>;


        //comment on:
        //<input type="text" placeholder="Enter Text" ref="input" onKeyPress={this.keypress.bind(this, 'aNode')}/>
        //this.keypress.bind(this, '1', '2')
        //above sendds '1' as first arg, '2' as second arg, and last arg is always event

        return (
            <div className="col-xs-offset-1">
                <h3>Hello World</h3>
                <input type="text" placeholder="Enter Text" ref="input" onKeyPress={this.keypress.bind(this, 'input')}/>
                {msg}
                <input type='text' placeholder="Game Room Name" ref="gameRoomInput"
                       onKeyPress={this.keypress.bind(this, 'gameRoomInput')}/>
            </div>
        )
    }
});

module.exports = SampleContainer;