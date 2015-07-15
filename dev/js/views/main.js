import React from 'react';
import Router from 'react-router';

import App from './App';
import LoginedApp from './LoginedApp';
import Top from './Top';
import SignUp from './users/SignUp';
import Dashboard from './Dashboard';
import Actives from './components/Actives';
import Settings from './components/Settings';

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route name="app" handler={App} path="/">
    <DefaultRoute handler={Top} />
    <Route path="user/sign_up" handler={SignUp} />
    <Route name="account" handler={LoginedApp} path="account">
      <Route name='dashboard' path="dashboard/:boardId" Handler={Dashboard}>
        <Route path="actives" handler={Actives} />
        <Route path="templates" handler={Dashboard} />
        <Route path="settings" handler={Settings} />
      </Route>
    </Route>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});
