var React = require('react'),
    Route = require('react-router'),
    RouteHandler = Route.RouteHandler
;

var App = React.createClass({
  render() {
    return (
      <div className="App">
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
