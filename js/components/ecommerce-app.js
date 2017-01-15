const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;

const actions = require('../actions/index');

const EcommerceApp = React.createClass({
    render() {
        return (
            <div>
                <h1 className="text-center">Ecommerce App</h1>
            </div>
        );
    }
});

const mapStateToProps = function(state, props) {
    return {
        data1: state.data1,
        data2: state.data2
    };
};

const Container = connect(mapStateToProps)(EcommerceApp);

module.exports = Container;