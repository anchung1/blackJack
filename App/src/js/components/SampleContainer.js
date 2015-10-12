var React = require('react');

var SampleContainer = React.createClass({

    render: function(){
        console.log('sample component');
        return (
            <div>
                <h3>Hello World</h3>
            </div>
        )
    }
});

module.exports = SampleContainer;