import React from 'react';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Input } from 'react-bootstrap';

import Item from './Item';
import Plus from './Plus';
import SmallModal from '../ConfirmationModal/SmallModal';

let styles = Vendor.prefix({
  container: {
    width:'100%',
    height:'42px',
    overflowX:'scroll',
    backgroundColor:'rgba(255,255,255,0.01)',
  },
  ul: {
    maxWidth:'10000px',
    height:'42px',
    borderBottomColor:'rgb(221, 221, 221)',
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plusConfirmation: false,
    }

    this._onClick = this._onClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
  }

  _onClick() {
    this.setState({ plusConfirmation: true });
  }

  _handleSubmit() {
    let name = React.findDOMNode(this.refs.board_name).value;
    this.setState({ plusConfirmation: false });
    this.props.handleTabPlus(name);
  }

  _handleCancel() {
    this.setState({ plusConfirmation: false });
  }

  render() {
    return (
      <div style={styles.container}>
        {
          this.state.plusConfirmation ?
          <SmallModal title='Board名を入力してください' handleSubmit={this._handleSubmit} handleCancel={this._handleCancel} onRequestHide={this._handleCancel}>
            <div className='form-group'>
              <input type='text' className='form-control input' placeholder='Board名' ref='board_name' />
            </div>
          </SmallModal>
          :
          ''
        }
        <ul className='nav nav-tabs' style={styles.ul}>
          {
            this.props.items.map((item) => {
              return (
                <Item name={item.name} />
              );
            })
          }
          <Plus handleTabPlus={this._onClick} />
        </ul>
      </div>
    );
  }
}

Header.propTypes = {
  items: React.PropTypes.array.isRequired,
  handleTabPlus: React.PropTypes.func.isRequired,
};

export default Radium(Header);
