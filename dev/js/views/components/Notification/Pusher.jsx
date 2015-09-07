import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import NotificationActionCreator from '../../../action_creators/NotificationActionCreator';
import NotificationStore from '../../../stores/NotificationStore';

import Notification from './Notification';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var styles = Vendor.prefix({
  container: {
    position:'fixed',
    width: '100%',
    bottom: '15px',
  },
});

class Pusher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: NotificationStore.getNotification()
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onClickNotification = this._onClickNotification.bind(this);
  }

  componentDidMount() {
    NotificationStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    NotificationStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      notification: NotificationStore.getNotification()
    });
  }

  _onClickNotification() {
    NotificationActionCreator.erase();
  }

  render() {
    const frontNotification = this.state.notification.frontPane && this.state.notification.content != '' ?
      <Notification 
        content={this.state.notification.content}
        category={this.state.notification.category}
        onClick={this._onClickNotification} />
      :
      ''
    ;
    const backNotification = !this.state.notification.frontPane && this.state.notification.content != '' ?
      <Notification 
        content={this.state.notification.content}
        category={this.state.notification.category}
        onClick={this._onClickNotification} 
      />
      :
      ''
    ;
    return (
      <div style={styles.container}>
        <ReactCSSTransitionGroup transitionName='backNotification' component='div' style={styles.container}>
          {backNotification}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup transitionName='frontNotification' component='div' style={styles.container}>
          {frontNotification}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Pusher.propTypes = {
};

export default Radium(Pusher);
