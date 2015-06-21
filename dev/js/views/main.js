var React = require('react'),
    Router = require('react-router'),

    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,

    App = require('./App'),
    Top = require('./Top'),
    SignUp = require('./users/SignUp')
;

var routes = (
  <Route name="app" handler={App} path="/">
    <DefaultRoute handler={Top} />
    <Route path="/user/sign_up" handler={SignUp} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});
