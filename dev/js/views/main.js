import React from 'react';
import Router from 'react-router';

import App from './App';
import LoginedApp from './LoginedApp';
import Top from './Top';
import SignUp from './users/SignUp';
import Dashboard from './Dashboard';
import Actives from './components/Actives';
import Invite from './components/Invite';
import Settings from './components/Settings';
import Logs from './components/Logs';

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route name="app" handler={App} path="/">
    <DefaultRoute handler={Top} />
    <Route path="user/sign_up" handler={SignUp} />
    <Route name="account" handler={LoginedApp} path="account">
      <Route name='dashboard' path="dashboard/:boardId" Handler={Dashboard}>
        <Route name="actives" handler={Actives} />
        <Route name="templates" handler={Dashboard} />
        <Route name="invite" handler={Invite} />
        <Route name="settings" handler={Settings} />
        <Route name="logs" handler={Logs} />
      </Route>
    </Route>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});
