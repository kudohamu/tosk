import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Button, ButtonInput, Input } from 'react-bootstrap';

var styles = Vendor.prefix({
  container: {
  }, 
  icon: {
    border:'solid 1px #a1a1a1',
    width:'120px',
    height:'120px',
    marginBottom:'10px',
  },
  errSpan: {
    color:'#a84f50',
    position:'relative',
    top:'-10px'
  },
  buttonContainer: {
    width:'54px',
    margin:'0 auto'
  }
});

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: {
        src: this.props.icon,
        row: '',
        msg: '',
        bsStyle: '',
      },
      name: {
        msg: '',
        bsStyle: ''
      },
      mail: {
        msg: '',
        bsStyle: ''
      },
      password: {
        msg: '',
        bsStyle: ''
      },
      passwordConfirmation: {
        msg: '',
        bsStyle: ''
      },
      disabled: 'disabled',
    };

    this._handleInputIcon = this._handleInputIcon.bind(this);
    this._handleInputName = this._handleInputName.bind(this);
    this._handleInputMail = this._handleInputMail.bind(this);
    this._handleInputPassword = this._handleInputPassword.bind(this);
    this._handleInputPasswordConfirmation = this._handleInputPasswordConfirmation.bind(this);
    this._checkResultOfValidation = this._checkResultOfValidation.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  /*
   * 選択ごとにアイコン画像のバリデーション
   * 画像サイズ: 7MB以下
   * 拡張子    : png, jpg, jpeg
   * needIconプロパティ
   *   true : アイコンが選択されていないとエラー
   *   false: アイコンが選択されていないと初期状態に戻す
   */
  _handleInputIcon() {
    const icon = React.findDOMNode(this.refs.icon).children[0];
    if (icon.files.length == 0) {
      if (this.props.needIcon) {
        this.setState({
          icon: {
            src: this.props.icon,
            row: '',
            msg: 'アイコンが選択されていません',
            bsStyle: 'error'
          },
          disabled: this._checkResultOfValidation('error', this.state.name.bsStyle, this.state.mail.bsStyle, this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
        });
      }else {
        this.setState({
          icon: {
            src: this.props.icon,
            row: '',
            msg: '',
            bsStyle: ''
          },
          disabled: this._checkResultOfValidation('', this.state.name.bsStyle, this.state.mail.bsStyle, this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
        })
      }
    }else {
      const file = icon.files[0];
      const filePath = icon.value;
      if (file.size <= 70000) {
        var reader = new FileReader();
        reader.onload = (upload) => {
          const rowData = upload.target.result;
          const filetype = upload.target.result.split('data:')[1].split(';')[0];
          if (/^image\/.+$/.test(filetype)) {
            if (/^image\/(png|jpg|jpeg)$/.test(filetype)) {
              this.setState({
                icon: {
                  src: rowData,
                  row: rowData,
                  msg: '',
                  bsStyle: 'success'
                },
                disabled: this._checkResultOfValidation('success', this.state.name.bsStyle, this.state.mail.bsStyle, this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
              });
            }else {
              this.setState({
                icon: {
                  src: this.state.icon.src,
                  row: this.state.icon.row,
                  msg: '拡張子が不正です',
                  bsStyle: 'error'
                },
                disabled: this._checkResultOfValidation('error', this.state.name.bsStyle, this.state.mail.bsStyle, this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
              });
            }
          }else {
            this.setState({
              icon: {
                src: this.state.icon.src,
                row: this.state.icon.row,
                msg: '画像ファイルではありません',
                bsStyle: 'error'
              },
              disabled: this._checkResultOfValidation('error', this.state.name.bsStyle, this.state.mail.bsStyle, this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
            });
          }
        };
        reader.readAsDataURL(file);
      }else {
        this.setState({
          icon: {
            src: this.state.icon.src,
            row: this.state.icon.row,
            msg: 'ファイルサイズが大きすぎます',
            bsStyle: 'error'
          },
          disabled: this._checkResultOfValidation('error', this.state.name.bsStyle, this.state.mail.bsStyle, this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
        });
      }
    }
  }

  /*
   * 入力ごとに名前のバリデーション
   * 4文字以上30文字以内
   * 使用可能文字：英数字, _, @, -
   */
  _handleInputName() {
    const name = React.findDOMNode(this.refs.name).children[0].value;
    var reg = /^[0-9a-zA-Z_@\-]{4,30}$/;
    if (reg.test(name)) {
      this.setState({
        name: {
          msg: '',
          bsStyle: 'success',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, 'success', this.state.mail.bsStyle, this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
      });
    }else {
      this.setState({
        name: {
          msg: '使用可能文字: 英数字, @, _, -(4文字以上30文字以内)',
          bsStyle: 'error',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, 'error', this.state.mail.bsStyle, this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
      });
    }
  }

  /*
   * 入力ごとにメールのバリデーション
   */
  _handleInputMail() {
    const mail = React.findDOMNode(this.refs.mail).children[0].value;
    var reg = /^([\w\-\+_]+\.?[\w\-\+_]+)+@([a-z0-9\-]+\.[a-z]+)+$/;
    if (reg.test(mail)) {
      this.setState({
        mail: {
          msg: '',
          bsStyle: 'success',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, this.state.name.bsStyle, 'success', this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
      });
    }else {
      this.setState({
        mail: {
          msg: '不正なメールアドレスです',
          bsStyle: 'error',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, this.state.name.bsStyle, 'error', this.state.password.bsStyle, this.state.passwordConfirmation.bsStyle)
      });
    }
  }

  /*
   * 入力ごとにパスワードのバリデーション
   * 8文字以上
   * 英数字のみの文字列だと警告
   */
  _handleInputPassword(e) {
    const password = React.findDOMNode(this.refs.password).children[0].value;
    var reg = /^[0-9a-zA-Z]+$/;
    if(password.length < 8) {
      this.setState({
        password: {
          msg: 'パスワードは8文字以上',
          bsStyle: 'error',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, this.state.name.bsStyle, this.state.mail.bsStyle, 'error', this.state.passwordConfirmation.bsStyle)
      });
    }else if(reg.test(password)) {
      this.setState({
        password: {
          msg: '',
          bsStyle: 'warning',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, this.state.name.bsStyle, this.state.mail.bsStyle, 'warning', this.state.passwordConfirmation.bsStyle)
      });
    }else {
      this.setState({
        password: {
          msg: '',
          bsStyle: 'success',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, this.state.name.bsStyle, this.state.mail.bsStyle, 'success', this.state.passwordConfirmation.bsStyle)
      });
    }
    this._handleInputPasswordConfirmation();
  }

  /*
   * 入力ごとにバリデーション
   * passwordと一致するか
   */
  _handleInputPasswordConfirmation() {
    const passwordConfirmation = React.findDOMNode(this.refs.passwordConfirmation).children[0].value;
    if (passwordConfirmation == React.findDOMNode(this.refs.password).children[0].value) {
      this.setState({
        passwordConfirmation: {
          msg: '',
          bsStyle: 'success',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, this.state.name.bsStyle, this.state.mail.bsStyle, this.state.password.bsStyle, 'success')
      });
    }else {
      this.setState({
        passwordConfirmation: {
          msg: '一致しません',
          bsStyle: 'error',
        },
        disabled: this._checkResultOfValidation(this.state.icon.bsStyle, this.state.name.bsStyle, this.state.mail.bsStyle, this.state.password.bsStyle, 'error')
      });
    }
  }

  /*
   * 入力全体のバリデーションの状態をチェック
   * 必要な項目のすべてのバリデーションが通っているか
   *   true : 空文字列を返す
   *   false: disabled
   */
  _checkResultOfValidation(iconStyle, nameStyle, mailStyle, passwordStyle, passwordConfirmationStyle) {
    if (
         (
           (!this.props.needIcon && iconStyle == '') || iconStyle == 'success'
         ) && 
         nameStyle == 'success' && 
         mailStyle == 'success' && 
         (
           !this.props.needPassword ||
           (
             (passwordStyle == 'success' || passwordStyle == 'warning') && 
             passwordConfirmationStyle == 'success'
           )
         )
       )
    {
      return '';
    }else {
      return 'disabled';
    }
  }

  _handleSubmit() {
    const icon = this.state.icon.row;
    const name = React.findDOMNode(this.refs.name).children[0].value;
    const mail = React.findDOMNode(this.refs.mail).children[0].value;
    const password = this.props.needPassword ? React.findDOMNode(this.refs.password).children[0].value : '';
    const passwordConfirmation = this.props.needPassword ? React.findDOMNode(this.refs.passwordConfirmation).children[0].value : '';

    this.props.handleSubmit(icon, name, mail, password, passwordConfirmation);
  }

  render() {
    const passwordInputs = this.props.needPassword ?
    <div>
      <Input type='password' placeholder='パスワード' onChange={this._handleInputPassword} defaultValue={this.props.password} bsStyle={this.state.password.bsStyle} ref='password' hasFeedback />
      <span style={styles.errSpan}>{this.state.password.msg}</span>

      <Input type='password' placeholder='パスワード（確認）' onChange={this._handleInputPasswordConfirmation} defaultValue={this.props.passwordConfirmation} bsStyle={this.state.passwordConfirmation.bsStyle} ref='passwordConfirmation' hasFeedback />
      <span style={styles.errSpan}>{this.state.passwordConfirmation.msg}</span>
    </div>
    :
    '';

    return (
      <div style={styles.container}>
        <div>
          <img src={this.state.icon.src} style={styles.icon} /> 
        </div>
        <Input type='file' help='jpg, jpeg, png(7M以下)' onChange={this._handleInputIcon} ref='icon' />
        <span style={styles.errSpan}>{this.state.icon.msg}</span>

        <Input type='text' placeholder='ユーザ名' onChange={this._handleInputName} defaultValue={this.props.name} bsStyle={this.state.name.bsStyle} ref='name' hasFeedback />
        <span style={styles.errSpan}>{this.state.name.msg}</span>

        <Input type='text' placeholder='メールアドレス' onChange={this._handleInputMail} defaultValue={this.props.mail} bsStyle={this.state.mail.bsStyle} ref='mail' hasFeedback />
        <span style={styles.errSpan}>{this.state.mail.msg}</span>

        {passwordInputs}
        
        <div style={styles.buttonContainer}>
          <Button bsStyle='success' disabled={this.state.disabled} onClick={this._handleSubmit} >変更</Button>
        </div>
      </div>
    );
  }
}

UserForm.propTypes = {
  icon                : React.PropTypes.string.isRequired,
  name                : React.PropTypes.string.isRequired,
  mail                : React.PropTypes.string.isRequired,
  password            : React.PropTypes.string,
  passwordConfirmation: React.PropTypes.string,

  handleSubmit        : React.PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  needIcon         : true,
  needPassword     : true,
  initialValidation: false,
};

export default Radium(UserForm);
