import React from 'react';
import {connect} from 'react-redux';
import {loadData, clearData, updateField, save} from '@/store/adminVideoCategoryEdit.store.js';
import {Map} from 'immutable';
import {Row, Col, Button, Glyphicon,  Modal} from 'react-bootstrap';
import {FieldGroup} from '@/components/Util.js';
import {goBack} from '@/store/store';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';

class VideoCategoryEditClass extends React.Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentWillMount() {
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
        this.props.updateField(field, value && value.target && value.target.value);
    }

    render() {
        return (<div className="video-category-edit">
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
                label="Название"
              />
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
};

export default connect(state=>({
    data: state.getIn(['admin', 'videoCategory', 'edit'], new Map()),
    busy: state.getIn(['ajaxStatus', 'posting']),
    netMessage: state.getIn(['ajaxStatus', 'message']),
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
    }
}))(VideoCategoryEditClass);
