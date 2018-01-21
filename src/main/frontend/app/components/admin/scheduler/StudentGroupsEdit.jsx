import React from 'react';
import {connect} from 'react-redux';
import {loadData, clearData, updateField, save} from '@/store/adminStudentGroupEdit.store.js';
import {Map, List, Set} from 'immutable';
import {Row, Col, Button, Glyphicon,  Modal} from 'react-bootstrap';
import {FieldGroup} from '@/components/Util.js';
import {goBack} from '@/store/store';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';
import {loadUsers} from '@/store/adminUsersList.store.js';

class VideoCategoryEditClass extends React.Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentWillMount() {
        this.props.loadUsers();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.isEdit = true;
            this.props.loadData(this.props.match.params.id);
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
        this.props.save(this.props.data);
    }
    setField(field, value) {
        if (!value || !value.target) {
            this.props.updateField(field, '');
        }
        if (value.target.type == 'select-multiple') {
            if (value.target.selectedOptions && value.target.selectedOptions.length > 0) {
                this.props.updateField(field, new Set(Array.from(value.target.selectedOptions).map(o=>o.value)));
            }else{
                this.props.updateField(field, new Set());
            }
        }else{
            this.props.updateField(field, value && value.target && value.target.value);
        }
    }

    render() {
        return (<div className="common-table-edit">
          <Modal show={this.props.netMessage} onHide={this.hideModal}>
            <Modal.Body>
              {this.props.netMessage}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.hideModal}>Оки доки</Button>
            </Modal.Footer>
          </Modal>
          <Row>
            <Col xs={12}>
              <FieldGroup
                value={this.props.data.get('name')}
                onChange={this.setField.bind(this, 'name')}
                id="name"
                type="text"
                label="Название группы"
              />
            </Col>
            <Col xs={12}>
              <FieldGroup
                value={this.props.data.get('users', new Set()).toJS()}
                onChange={this.setField.bind(this, 'users')}
                id="users"
                componentClass="select"
                label="Студенты"
                multiple
              >
              {this.props.users.map(e=><option key={e.get('id')} value={e.get('id')}>{e.get('fullname')}</option>)}
              </FieldGroup>
            </Col>
            <Col xs={12}>
            <Button bsStyle="primary" style={{float: 'right'}} onClick={this.save} disabled={this.props.busy || !this.props.data.get('name')}>
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

VideoCategoryEditClass.propTypes = {
    match: React.PropTypes.object,
    loadData: React.PropTypes.func,
    updateField: React.PropTypes.func,
    clearData: React.PropTypes.func,
    save: React.PropTypes.func,
    data: React.PropTypes.object,
    clearMessage: React.PropTypes.func,
    busy: React.PropTypes.bool,
    netMessage: React.PropTypes.string,
    loadUsers: React.PropTypes.func,
    users: React.PropTypes.object,
};

export default connect(state=>({
    data: state.getIn(['admin', 'studentGroups', 'edit'], new Map()),
    busy: state.getIn(['ajaxStatus', 'posting']),
    netMessage: state.getIn(['ajaxStatus', 'message']),
    users: state.getIn(['admin', 'users', 'list'], new List()),
}), dispatch=>({
    loadData(id) {
        loadData(dispatch, id);
    },
    clearData() {
        clearData(dispatch);
    },
    updateField(field, value) {
        updateField(dispatch, field, value);
    },
    save(data) {
        save(dispatch, data);
    },
    clearMessage() {
        clearMessage(dispatch);
    },
    loadUsers() {
        loadUsers(dispatch);
    }
}))(VideoCategoryEditClass);
