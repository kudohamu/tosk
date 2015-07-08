import React from 'react';
import Router from 'react-router';

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <RouteHandler />
      </div>
    );
  }
}
