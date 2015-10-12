var React = require('react');
var SampleContainer = require('./components/SampleContainer');


var App = React.createClass({
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <SampleContainer></SampleContainer>
                </div>
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app')
);
