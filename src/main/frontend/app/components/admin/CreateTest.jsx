import React from 'react';
import { connect } from 'react-redux';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';
import {Button, FormControl, Row, Col, Modal} from 'react-bootstrap';
import {types} from '../skilltest/QuestionTypes.js';
import {addQuestion, alterField, loadTestToEdit, clearData, sumbitNewTest, sumbitTestUpdate} from '@/store/skilltestCreator.store';
import {Map, List} from 'immutable';
import CreateQuestion from './CreateQuestion';
import {goBack} from '@/store/store';
import './creator.css';

class CreateTestClass extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.setTestName = this.setTestName.bind(this);
        this.selectQType = this.selectQType.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {qType: types[0]};
        this.isEdit = false;
    }
    componentWillMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.editTestName) {
            this.isEdit = true;
            this.props.loadTestToEdit(this.props.match.params.editTestName);
        }else{
            this.props.clearData();
        }
    }
    addQuestion() {
        this.props.addQuestion(this.state.qType.value ? this.state.qType.value : this.state.qType);
    }
    hideModal() {
        this.props.clearMessage();
        if (this.props.netMessage == SUCCESS_MESSAGE) {
            goBack();
        }
    }
    selectQType(e) {
        this.setState({qType: e.target.value});
    }
    setTestName(e) {
        this.props.alterField('testName', e.target.value);
    }
    submit() {
        if (this.isEdit) {
            this.props.sumbitTestUpdate(this.props.test.toJS());
        }else{
            this.props.sumbitNewTest(this.props.test.toJS());
        }
    }
    render() {
        return (
      <div className="test-creation-form">
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
            <FormControl
              value={this.props.test.get('testName') || ''}
              onChange={this.setTestName}
              id="testName"
              type="text"
              placeholder="Название теста (обязательное поле)"
            />
          </Col>
        </Row>
        {this.props.test.get('questions', new List()).map((q, idx)=><CreateQuestion question={q} qIdx={idx} key={q.get('id') || idx}/>)}
        <Row style={{marginTop: 5}}>
          <Col xs={12} md={6}>
            <FormControl componentClass="select" placeholder="Тип вопроса" onChange={this.selectQType} value={this.state.qType}>
            {types.map((q, idx)=> <option value={q.value} key={idx} >{q.label}</option>)}
            </FormControl>
          </Col>
          <Col xs={12} md={6}>
            <Button onClick={this.addQuestion}>
            Добавить новый вопрос
            </Button>
          </Col>
        </Row>
        <Row style={{marginTop: 5}}>
          <Col xs={12}>
            <Button onClick={goBack}>
              Назад
            </Button>
            <Button onClick={this.submit} disabled={this.props.busy || !this.props.test.get('testName')} style={{marginLeft: 5}}>
            {this.isEdit ? 'Обновить тест!' : 'Создать тест!'}
            </Button>
          </Col>
        </Row>
      </div>
    );
    }
}
CreateTestClass.propTypes = {
    addQuestion: React.PropTypes.func,
    alterField: React.PropTypes.func,
    test: React.PropTypes.object,
    sumbitNewTest: React.PropTypes.func,
    sumbitTestUpdate: React.PropTypes.func,
    clearMessage: React.PropTypes.func,
    busy: React.PropTypes.bool,
    netMessage: React.PropTypes.string,
    loadTestToEdit: React.PropTypes.func,
    match: React.PropTypes.object,
    clearData: React.PropTypes.func,
};
export default connect((state)=>({
    test: state.getIn(['skilltest', 'creator'], new Map()),
    busy: state.getIn(['ajaxStatus', 'posting']),
    netMessage: state.getIn(['ajaxStatus', 'message']),
}),
dispatch=>({
    addQuestion(qType) {
        addQuestion(dispatch, qType);
    },
    alterField(field, value) {
        alterField(dispatch, field, value);
    },
    sumbitNewTest(data) {
        sumbitNewTest(dispatch, data);
    },
    sumbitTestUpdate(data) {
        sumbitTestUpdate(dispatch, data);
    },
    clearMessage() {
        clearMessage(dispatch);
    },
    loadTestToEdit(testName) {
        loadTestToEdit(dispatch, testName);
    },
    clearData() {
        clearData(dispatch);
    }
}))(CreateTestClass);
