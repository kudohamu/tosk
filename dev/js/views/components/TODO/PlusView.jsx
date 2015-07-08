import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Glyphicon } from 'react-bootstrap';

import BaseTODO from './Base';
import InputView from './InputView';

var styles = Vendor.prefix({
  container: {
    width:"100%",
    height:"100%",

    ':hover': {
      cursor:'pointer',
    }
  },
  adjuster: {
    margin:"0 auto",
    width:"14px",
  },
  icon: {
    margin:"0 auto",
    padding:"17px 0px",
    color:"rgba(130,130,130,1)",
  },
  inputViewContainer: {
    padding:'3px',
  }
});

class PlusView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: false,
    };
    this._handleClick = this._handleClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
  }
  _handleClick() {
    this.setState({ input: true });
  }

  _handleSubmit(content) {
    this.setState({ input: false });
    this.props.handleTODOPlus(this.props.folderID, content);
  }

  _handleCancel() {
    this.setState({ input: false });
  }

  render() {
    return (
      <BaseTODO>
        {
          this.state.input ?
          (
            <div style={styles.inputViewContainer}>
              <InputView handleSubmit={this._handleSubmit} handleCancel={this._handleCancel} trashable={false} />
            </div>
          ) :
          (
            <div style={styles.container} onClick={this._handleClick}>
              <div style={styles.adjuster}>
                <Glyphicon glyph="plus" style={styles.icon} />
              </div>
            </div>
          )
        }
      </BaseTODO>
    );
  }
}

PlusView.propTypes = {
  folderID: React.PropTypes.number.isRequired,
  handleTODOPlus: React.PropTypes.func.isRequired,
};

export default Radium(PlusView);
