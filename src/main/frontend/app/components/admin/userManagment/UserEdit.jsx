import React from 'react';
import {connect} from 'react-redux';
import {loadUser, clearData, updateUserFields, saveUser} from '@/store/adminUserEdit.store.js';
import {Map, Set} from 'immutable';
import {Row, Col, Button, Glyphicon, Checkbox, Modal} from 'react-bootstrap';
import {FieldGroup} from '@/components/Util.js';
import {goBack} from '@/store/store';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';

class UserEditClass extends React.Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentWillMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.editUserId) {
            this.isEdit = true;
            this.props.loadUser(this.props.match.params.editUserId);
        }else{
            this.props.clearData();
        }
    }
    componentWillUnmount() {
        this.props.clearData();
    }
    hideModal() {
        this.props.clearMessage();
        if (this.props.netMessage == SUCCESS_MESSAGE) {
            goBack();
        }
    }
    save() {
        this.props.saveUser(this.props.data);
    }
    setField(field, value) {
        if (!value || value.target) {
            this.props.updateUserFields(field, '');
        }if (value.target.type == 'checkbox') {
            this.props.updateUserFields(field, value.target.checked);
        }else if (value.target.type == 'select-multiple') {
            if (value.target.selectedOptions && value.target.selectedOptions.length > 0) {
                this.props.updateUserFields(field, new Set(Array.from(value.target.selectedOptions).map(o=>o.value)));
            }else{
                this.props.updateUserFields(field, new Set());
            }
        }else{
            this.props.updateUserFields(field, value && value.target && value.target.value);
        }
    }

    render() {
        return (<div className="user-edit">
          <Modal show={this.props.netMessage} onHide={this.hideModal}>
            <Modal.Body>
              {this.props.netMessage}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.hideModal}>Оки доки</Button>
            </Modal.Footer>
          </Modal>
          <input id="username" style={{display: 'none'}} type="text"/>
          <input id="password" style={{display: 'none'}} type="password"/>
          <Row>
            <Col md={4} xs={12}>
              <FieldGroup
                value={this.props.data.get('firstName')}
                onChange={this.setField.bind(this, 'firstName')}
                id="firstName"
                type="text"
                label="Имя"
              />
            </Col>
            <Col md={4} xs={12}>
              <FieldGroup
                value={this.props.data.get('lastName')}
                onChange={this.setField.bind(this, 'lastName')}
                id="lastName"
                type="text"
                label="Фамилия"
              />
            </Col>
            <Col md={4} xs={12}>
              <FieldGroup
                value={this.props.data.get('email')}
                onChange={this.setField.bind(this, 'email')}
                id="email"
                type="text"
                label="Почта"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={12}>
              <FieldGroup
                value={this.props.data.get('username')}
                onChange={this.setField.bind(this, 'username')}
                autocomplete="nope"
                id="username-noautofill"
                type="text"
                label="Логин"
              />
            </Col>
            <Col md={4} xs={12}>
              <FieldGroup
                value={this.props.data.get('password')}
                onChange={this.setField.bind(this, 'password')}
                autocomplete="new-password"
                id="password-noautofill"
                type="password"
                placeholder="Оставь пустым если не надо менять"
                label="Пароль"
              />
            </Col>
            <Col md={4} xs={12}>
              <FieldGroup
                value={this.props.data.get('roles', new Set()).toJS()}
                onChange={this.setField.bind(this, 'roles')}
                id="roles"
                componentClass="select"
                label="Роли"
                multiple
              >
                <option value="ROLE_ADMIN">Админ</option>
                <option value="ROLE_USER">Пользователь</option>
              </FieldGroup>
            </Col>
          </Row>
          <Row>
          <Col xs={12}>
            <Checkbox
              checked={this.props.data.get('enabled')}
              onChange={this.setField.bind(this, 'enabled')}
              id="enabled"
              inline
              className="user-enabled"
            >
              Активен
            </Checkbox>
            <Button bsStyle="primary" style={{float: 'right'}} onClick={this.save} disabled={this.props.busy}>
              <Glyphicon glyph="save"/>
              Сохранить
            </Button>
            <Button style={{float: 'right', margin: '0 10px'}} onClick={goBack}>
              Назад
            </Button>
          </Col>
          </Row>
        </div>);
    }
}

UserEditClass.propTypes = {
    match: React.PropTypes.object,
    loadUser: React.PropTypes.func,
    updateUserFields: React.PropTypes.func,
    clearData: React.PropTypes.func,
    saveUser: React.PropTypes.func,
    data: React.PropTypes.object,
    clearMessage: React.PropTypes.func,
    busy: React.PropTypes.bool,
    netMessage: React.PropTypes.string,
};

export default connect(state=>({
    data: state.getIn(['admin', 'users', 'edit'], new Map()),
    busy: state.getIn(['ajaxStatus', 'posting']),
    netMessage: state.getIn(['ajaxStatus', 'message']),
}), dispatch=>({
    loadUser(id) {
        loadUser(dispatch, id);
    },
    clearData() {
        clearData(dispatch);
    },
    updateUserFields(field, value) {
        updateUserFields(dispatch, field, value);
    },
    saveUser(data) {
        saveUser(dispatch, data);
    },
    clearMessage() {
        clearMessage(dispatch);
    }
}))(UserEditClass);
