import React from 'react';
import {Row, Col,  Alert, Button } from 'react-bootstrap';

import { tryToLogin } from '@/store/useraccount.store.js';
import { connect } from 'react-redux';
import {FieldGroup} from '../Util.js';

class LoginPageClass extends React.Component {

    constructor(args) {
        super(args);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
        };
        document.title = 'Login';
    }
    onSubmit() {
        this.props.login(
      this.state.username,
      this.state.password);
    }
    handleUserNameChange(event) {
        this.setState({ username: event.target.value, password: this.state.password });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value, username: this.state.username });
    }
    render() {
        return (
      <div>
        <Row>
          <Col xs={12} md={4} mdOffset={4}>
            <FieldGroup
              onChange={this.handleUserNameChange}
              value={this.state.username}
              id="username"
              type="text"
              label="Имя пользователя"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} mdOffset={4}>
            <FieldGroup
              onChange={this.handlePasswordChange}
              value={this.state.password}
              id="password"
              type="password"
              label="Пароль"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} mdOffset={4}>
            <Button  onClick={this.onSubmit} bsStyle="primary"style={{ width: '100%' }}>
                Войти
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} mdOffset={4}>
              {this.props.errors ?
                <Alert bsStyle="default" className="has-error" style={{ padding: 0 }}>
                  <div className="help-block" style={{ fontSize: 'medium' }}>
                    {this.props.errors}
                  </div>
                </Alert> :
                ''}

          </Col>
        </Row>
      </div>);
    }
  }
LoginPageClass.propTypes = {
    errors: React.PropTypes.node,
    login: React.PropTypes.func,
};

export default connect((state)=>({
    errors: state.getIn(['session', 'login_error']),
}), dispatch=>({
    login: (user, pass) => tryToLogin(dispatch, user, pass)
}))(LoginPageClass);
