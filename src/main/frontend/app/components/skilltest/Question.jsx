import React from 'react';
import { connect } from 'react-redux';
import {Map, List, Set} from 'immutable';
import {Row, Col, Checkbox, Radio, FormControl} from 'react-bootstrap';
import {answerGiven} from '@/store/skilltestResults.store';
import {typeName} from './QuestionTypes.js';
class Question extends React.Component {
    constructor(props) {
        super(props);
        this.formAnswers = this.formAnswers.bind(this);
        this.formAnswerSelectOne = this.formAnswerSelectOne.bind(this);
        this.formAnswerSelectMany = this.formAnswerSelectMany.bind(this);
        this.formAnswerText = this.formAnswerText.bind(this);

        this.saveAnswerText = this.saveAnswerText.bind(this);
        this.saveAnswerRadio = this.saveAnswerRadio.bind(this);
        this.saveAnswerCheckbox = this.saveAnswerCheckbox.bind(this);
    }
    saveAnswerText(e) {
        this.props.answerGiven(e.target.value);
    }
    saveAnswerRadio(e) {
        this.props.answerGiven(e.target.id);
    }
    saveAnswerCheckbox(e) {
        let newValue = this.props.results ? this.props.results : new Set();
        if (!newValue.has(e.target.id.toString())) {
            newValue = newValue.add(e.target.id);
        }else{
            newValue = newValue.delete(e.target.id.toString());
        }
        this.props.answerGiven(newValue);
    }
    formAnswerSelectOne() {
        const defaultValue = this.props.results ? this.props.results : -1;
        return this.props.data.get('answers', new List()).map((e, idx)=>
      <Row key={idx}>
        <Col xs={12}>
          <Radio
          name="radioGroup" id={e.get('id')}
          checked={defaultValue == e.get('id')}
          onChange={this.saveAnswerRadio}>
            {e.get('text')}
          </Radio>
        </Col>
      </Row>
    );
    }
    formAnswerSelectMany() {
        const defaultValue = this.props.results ? this.props.results : new Set();
        return this.props.data.get('answers', new List()).map((e, idx)=>
        <Row key={idx}>
          <Col xs={12}>
            <Checkbox id={e.get('id')} onChange={this.saveAnswerCheckbox} checked={defaultValue.has(e.get('id').toString())}>
              {e.get('text')}
            </Checkbox>
          </Col>
        </Row>
    );
    }
    formAnswerText() {
        const defaultValue = this.props.results ? this.props.results : '';
        return (
      <Row>
        <Col xs={12} md={6}>
          <FormControl
            value={defaultValue}
            onChange={this.saveAnswerText}
            id="answerField"
            type="text"
            placeholder="Введите ответ"
          />
        </Col>
      </Row>);
    }
    formAnswers() {
        let answers = <div/>;
        switch (this.props.data.get('answerType')) {
            case typeName.SELECT_ONE:
                answers = this.formAnswerSelectOne();
                break;
            case typeName.SELECT_MANY:
                answers = this.formAnswerSelectMany();
                break;
            case typeName.TEXT:
                answers = this.formAnswerText();
                break;
            default:
                break;
        }
        return answers;
    }
    render() {
        return(
      <div className="border-bottom">
      <Row>
      <Col xs={12}>
        {this.props.data.get('question')}
      </Col>
      </Row>
        {this.formAnswers()}
      </div>
    );
    }
}
Question.propTypes = {
    qIdx: React.PropTypes.number,
    data: React.PropTypes.object,
    answerGiven: React.PropTypes.func,
    results: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.number, React.PropTypes.string])
};
export default connect(
  (state, props)=>({
      data: state.getIn(['skilltest', 'questions', 'questions'], new List()).get(props.qIdx, new Map()),
      results: state.getIn(['skilltest', 'attempt', 'results', props.qIdx]),
  }),
  (dispatch, props)=>({
      answerGiven(answer) {
          answerGiven(dispatch, props.qIdx, answer);
      }
  })
)(Question);
