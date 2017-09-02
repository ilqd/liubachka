import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';
import {goBack} from '@/store/store';
import {FieldGroup} from '@/components/Util.js';
import {Map} from 'immutable';
import {loadPageToEdit, createNewPage, changeField, save } from '@/store/adminPageEdit.store';

class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onUrlChange = this.onFieldChange.bind(this, 'url');
        this.hideModal = this.hideModal.bind(this);
        this.save = this.save.bind(this);
        this.state = {nameValidation: 'error'};
    }
    componentWillMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.editPageId) {
            this.isEdit = true;
            this.props.loadPageToEdit(this.props.match.params.editPageId);
        }else{
            this.props.createNewPage();
        }
    }
    onFieldChange(field, e) {
        this.props.changeField(field, e.target.value);
    }
    onNameChange(e) {
        const length = e.target.value ? e.target.value.length : 0;
        this.setState({nameValidation: length >= 1 ? 'success' : 'error'});
        this.onFieldChange('name', e);
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
    render() {
        return (<div>
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
          onChange={this.onNameChange}
          value={this.props.data.get('name') || ''}
          validationState={this.state.nameValidation}
          id="name"
          type="text"
          label="Имя станицы"
        />
      </Col>
      <Col xs={12}>
        <FieldGroup
          onChange={this.onUrlChange}
          value={this.props.data.get('url') || ''}
          id="url"
          type="text"
          label="URL страницы"
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <Button onClick={this.save}>Создать</Button>
      </Col>
    </Row>
  </div>);
    }
}
CreatePage.propTypes = {
    data: React.PropTypes.object,
    loadPageToEdit: React.PropTypes.func,
    createNewPage: React.PropTypes.func,
    changeField: React.PropTypes.func,
    match: React.PropTypes.object,
    clearMessage: React.PropTypes.func,
    save: React.PropTypes.func,
    netMessage: React.PropTypes.string,
};
export default connect(state=> ({
    data: state.getIn(['admin', 'pages', 'edit'], new Map()),
    busy: state.getIn(['ajaxStatus', 'posting']),
    netMessage: state.getIn(['ajaxStatus', 'message']),
}), dispatch => ({
    loadPageToEdit(id) {
        loadPageToEdit(dispatch, id);
    },
    createNewPage() {
        createNewPage(dispatch);
    },
    changeField(field, value) {
        changeField(dispatch, field, value);
    },
    save(data) {
        save(dispatch, data);
    },
    clearMessage() {
        clearMessage(dispatch);
    },
}))(CreatePage);
