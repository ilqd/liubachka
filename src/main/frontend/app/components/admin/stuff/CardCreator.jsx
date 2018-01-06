import React from 'react';
import {Row, Col, Button, Glyphicon, Modal, Checkbox} from 'react-bootstrap';
import {FieldGroup} from '../../Util.js';
import './cardcreator.css';
import {connect} from 'react-redux';
import {updateField, save, clearData} from '@/store/adminCardCreatorEdit.store.js';
import {Map} from 'immutable';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';

class CardCreator extends React.Component {
    constructor(props) {
        super(props);
        this.createData = this.createData.bind(this);
        this.save = this.save.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.setField = this.setField.bind(this);
        this.cancel = this.cancel.bind(this);
        this.setHidden = this.setHidden.bind(this);
        this.state = {data: []};
    }
    componentWillMount() {
        this.setState({data: this.createData()});
    }
    componentWillReceiveProps(props) {
        this.setState({data: this.createData(props)});
    }
    hideModal() {
        this.props.clearMessage();
        if (this.props.netMessage == SUCCESS_MESSAGE) {
            this.props.clearMessage();
            this.props.clearData();
        }
    }
    cancel() {
        this.props.clearData();
    }
    save() {
        this.props.save(this.props.data);
    }
    setHidden() {
        this.props.updateField('hidden', !this.props.data.get('hidden'));
    }
    setField(field, value) {
        if (!value || !value.target) {
            this.props.updateField(field, '');
        }
        this.props.updateField(field, value && value.target && value.target.value);
    }
    createData(props = this.props) {
        const data = [];
        if (!props) {
            return data;
        }
        const text = props.data.get('text');
        const separator = props.data.get('separator');
        const linesPerCard = parseInt(props.data.get('linesPerCard'), 10 ) || 10;
        const label = props.data.get('label');
        const width = props.data.get('width') || 200;
        const style = {width: `${width}px`};
        if (text) {
            const splitted = text.split(separator);
            let i;
            let j;
            for (i = 0, j = splitted.length; i < j; i += linesPerCard) {
                const temparray = splitted.slice(i, i + linesPerCard);
                const block = (<div style={style} className="card-block" key={`${i}_${linesPerCard}_${width}`}>
              <Row>
              <Col xs={12}>
                <div className="card-label">
                {label}
                </div>
              </Col>
              </Row>
              {temparray.map((elem, idx)=><Row key={idx}>
              <Col xs={12}>
              <div className={idx == temparray.length - 1 ? 'card-line last-line' : 'card-line'}>
              <div>
              {idx + 1}. {elem}
              </div>
              </div>
              </Col>
              </Row>)}
              </div>);
                data.push(block);
            }
        }
        return data;
    }
    render() {
        return(<div>
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
          placeholder="Название карточки"
          label="Название карточки"
        />
      </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <FieldGroup
            value={this.props.data.get('label')}
            onChange={this.setField.bind(this, 'label')}
            id="label"
            componentClass="textarea"
            placeholder="Заголовок карточек"
            label="Заголовок карточек"
            rows="3"
          />
        </Col>
        <Col xs={12} md={2}>
          <FieldGroup
            value={this.props.data.get('separator')}
            onChange={this.setField.bind(this, 'separator')}
            id="separator"
            type="text"
            placeholder="Разделитель"
            label="Разделитель"
          />
        </Col>
        <Col xs={12} md={3}>
          <FieldGroup
            value={this.props.data.get('width') || 200}
            onChange={this.setField.bind(this, 'width')}
            id="width"
            type="number"
            min="1"
            max="500"
            placeholder="Ширина карточки"
            label="Ширина карточки"
          />
        </Col>
        <Col xs={12} md={3}>
          <FieldGroup
            value={this.props.data.get('linesPerCard')}
            onChange={this.setField.bind(this, 'linesPerCard')}
            id="linesPerCard"
            type="number"
            min="1"
            max="100"
            placeholder="Строк на карточку"
            label="Строк на карточку"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FieldGroup
            value={this.props.data.get('text')}
            onChange={this.setField.bind(this, 'text')}
            id="text"
            componentClass="textarea"
            placeholder="Текст"
            label="Текст"
            rows="5"
          />
        </Col>
      </Row>

      <Row >
      <Col xs={12} className="all-card-blocks">
      {this.state.data}
      </Col>
      </Row>
      <Row>
      <Col xs={12}>
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
CardCreator.propTypes = {
    data: React.PropTypes.object,
    updateField: React.PropTypes.func,
    busy: React.PropTypes.bool,
    netMessage: React.PropTypes.string,
    clearMessage: React.PropTypes.func,
    clearData: React.PropTypes.func,
    save: React.PropTypes.func,
};
export default connect(state=>({
    data: state.getIn(['admin', 'cards', 'edit'], new Map()),
    busy: state.getIn(['ajaxStatus', 'posting']),
    netMessage: state.getIn(['ajaxStatus', 'message']),
}), dispatch=>({
    updateField(field, value) {
        updateField(dispatch, field, value);
    },
    save(data) {
        save(dispatch, data);
    },
    clearMessage() {
        clearMessage(dispatch);
    },
    clearData() {
        clearData(dispatch);
    }
}))(CardCreator);
