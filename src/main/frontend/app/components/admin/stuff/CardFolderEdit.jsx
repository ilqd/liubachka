import React from 'react';
import {connect} from 'react-redux';
import {loadData, clearData, updateField, save} from '@/store/adminCardFolderEdit.store.js';
import {Map} from 'immutable';
import {Row, Col, Button, Glyphicon, Checkbox, Modal} from 'react-bootstrap';
import {FieldGroup} from '@/components/Util.js';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';

class CardFolderEditClass extends React.Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.cancel = this.cancel.bind(this);
        this.setFinalized = this.setFinalized.bind(this);
        this.setHidden = this.setHidden.bind(this);
    }
    componentWillMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.parentId) {
            this.props.updateField('parent', this.props.match.params.parentId);
        }else if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.isEdit = true;
            this.props.loadData(this.props.match.params.id);
        }
    }
    componentWillUnmount() {
        this.props.clearData();
    }
    cancel() {
        this.props.clearData();
    }
    hideModal() {
        this.props.clearMessage();
        if (this.props.netMessage == SUCCESS_MESSAGE) {
            this.props.clearMessage();
            this.props.clearData();
        }
    }
    save() {
        this.props.save(this.props.data);
    }
    setHidden() {
        this.props.updateField('hidden', !this.props.data.get('hidden'));
    }
    setFinalized() {
        this.props.updateField('finalized', !this.props.data.get('finalized'));
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
                value={this.props.data.get('name') || ''}
                onChange={this.setField.bind(this, 'name')}
                id="name"
                type="text"
                label="Название"
              />
            </Col>
            <Col xs={12}>
              <Checkbox
                className="finalize-button"
                title="Запретить создание карточек и папок в этой папке"
                checked={this.props.data.get('finalized')}
                onChange={this.setFinalized}>
                 Завершить
              </Checkbox>
              <Checkbox
                className={`delete-button ${this.props.data.get('hidden') ? 'delete-checked' : ''}`}
                checked={this.props.data.get('hidden')}
                onChange={this.setHidden}>
                 Удалить
              </Checkbox>
              <Button bsStyle="primary" style={{float: 'right'}} onClick={this.save} disabled={this.props.busy || !this.props.data.get('name')}>
                <Glyphicon glyph="save"/>
                Сохранить
              </Button>
              <Button style={{float: 'right', margin: '0 10px'}} onClick={this.cancel}>
                Назад
              </Button>
           </Col>
          </Row>
        </div>);
    }
}

CardFolderEditClass.propTypes = {
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
    data: state.getIn(['admin', 'cards', 'folderEdit'], new Map()),
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
}))(CardFolderEditClass);
