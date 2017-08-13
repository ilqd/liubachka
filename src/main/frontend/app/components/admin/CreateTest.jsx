import React from 'react';
import { connect } from 'react-redux';
import {post} from '@/store/net.store.js';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {types} from './QuestionTypes.js';
import {addQuestion, alterField} from '@/store/skilltestCreator.store';
import {Map, List} from 'immutable';
import CreateQuestion from './CreateQuestion';
import './creator.css';

class CreateTestClass extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.setTestName = this.setTestName.bind(this);
        this.selectQType = this.selectQType.bind(this);
        this.state = {qType: types[0]};
    }
    addQuestion() {
        this.props.addQuestion(this.state.qType.value ? this.state.qType.value : this.state.qType);
    }
    selectQType(e) {
        this.setState({qType: e.target.value});
    }
    setTestName(e) {
        this.props.alterField('testName', e.target.value);
    }
    submit() {
        this.props.post('/api/tests/create', this.props.test.toJS());
    }
    render() {
        return (
      <div className="test-creation-form">
        <Row>
          <Col xs={12}>
            <FormControl
              value={this.props.test.get('testName')}
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
            <Button onClick={this.submit}>
            Создать тест!
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
    post: React.PropTypes.func,
};
export default connect((state)=>({
    test: state.getIn(['skilltest', 'creator'], new Map()),
}),
dispatch=>({
    addQuestion(qType) {
        addQuestion(dispatch, qType);
    },
    alterField(field, value) {
        alterField(dispatch, field, value);
    },
    post(url, data) {
        post(dispatch, url, data);
    }
}))(CreateTestClass);
