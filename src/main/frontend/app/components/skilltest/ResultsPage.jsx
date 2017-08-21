import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Button} from 'react-bootstrap';
import {List, Map, Set} from 'immutable';
import {typeName} from './QuestionTypes.js';
import InputMask from 'react-input-mask';
import { FormGroup, ControlLabel} from 'react-bootstrap';
import {changeExamineeInfo, submitTestResults} from '@/store/skilltestResults.store';

export function checkSelectTextQuestion(question, answer = '') {
    const correctAnswers = question.get('correctAnswers').toJS();
    return correctAnswers.findIndex(a => a.toLowerCase() === answer.toLowerCase()) > -1;
}

class Skilltest extends React.Component {
    constructor(props) {
        super(props);
        this.getQuestionsCount = this.getQuestionsCount.bind(this);
        this.checkCorrectAnswers = this.checkCorrectAnswers.bind(this);
        this.checkSelectOneQuestion = this.checkSelectOneQuestion.bind(this);
        this.checkSelectManyQuestion = this.checkSelectManyQuestion.bind(this);
        this.checkSelectTextQuestion = checkSelectTextQuestion.bind(this);
        this.submitTestResults = this.submitTestResults.bind(this);
        this.getResultValues = this.getResultValues.bind(this);
        this.getPointsCount = this.getPointsCount.bind(this);
        this.submitTestResultsCallMe = this.submitTestResults.bind(this, true);
        this.submitTestResultsDontCall = this.submitTestResults.bind(this, false);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.state = {questionsCount: 0, correctAnswersCount: 0, totalPoints: 0, pointsEarned: 0, phoneValid: false};
    }
    componentWillMount() {
        this.getResultValues();
    }
    componentWillReceiveProps(props) {
        this.getResultValues(props);
    }
    onPhoneChange(e) {
        this.props.changeExamineeInfo('phone', e.target.value);
        const regExp = /^\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;
        this.setState({phoneValid: regExp.test(e.target.value)});
    }
    getResultValues(props = this.props) {
        const checkedAnswers = this.checkCorrectAnswers(props);
        this.setState({
            questionsCount: this.getQuestionsCount(props),
            totalPoints: this.getPointsCount(props),
            correctAnswersCount: checkedAnswers.count,
            pointsEarned: checkedAnswers.points,
        });
    }
    getQuestionsCount(props = this.props) {
        if (props.questions) {
            return props.questions.get('questions', new List()).size;
        }
        return 0;
    }
    getPointsCount(props = this.props) {
        if (props.questions) {
            return props.questions.get('questions', new List()).reduce((sum, q)=>sum + q.get('pointsAwarded'), 0);
        }
        return 0;
    }
    checkSelectOneQuestion(question, answer) {
        return question.get('answers', new List()).find(a=>a.get('id') == answer, this, new Map()).get('correct');
    }
    checkSelectManyQuestion(question, answer = new Set()) {
        const correctIds = question.get('answers', new List()).map(a=>a.get('correct') ? a.get('id') : undefined).filter(a=>a).toSet();
        const answerInt = answer.map(a=>parseInt(a, 10));
        return (correctIds.size == answerInt.size && correctIds.intersect(answerInt).size == correctIds.size);
    }
    checkCorrectAnswers(props = this.props) {
        let count = 0;
        let points = 0;
        if (props.questions) {
            props.questions.get('questions', new List()).forEach((question, idx)=>{
                const answerGiven = props.results.get(idx);
                let isCorrect = false;
                switch (question.get('answerType')) {
                    case typeName.SELECT_ONE:
                        isCorrect = this.checkSelectOneQuestion(question, answerGiven);
                        break;
                    case typeName.SELECT_MANY:
                        isCorrect = this.checkSelectManyQuestion(question, answerGiven);
                        break;
                    case typeName.TEXT:
                        isCorrect = this.checkSelectTextQuestion(question, answerGiven);
                        break;
                    default:
                        break;
                }
                if (isCorrect) {
                    count++;
                    points += question.get('pointsAwarded');
                }
            });
        }
        return {count, points};
    }
    submitTestResults(isInterested) {
        if (isInterested && !this.state.phoneValid) {
            return;
        }
        let composedData = new Map(this.props.attemptData);
        composedData = composedData
        .set('testSnapShotDto', JSON.stringify(this.props.questions.toJSON()))
        .set('resultsSnapShotDto', JSON.stringify(this.props.results.toJSON()));
        composedData = composedData.set('totalQuestions', this.state.questionsCount).set('correctAnswers', this.state.correctAnswersCount);
        composedData = composedData.set('totalPoints', this.state.totalPoints).set('pointsEarned', this.state.pointsEarned);
        composedData = composedData.set('testName', this.props.questions.get('testName'));
        this.props.submitTestResults(composedData.toJS(), isInterested);
    }
    render() {
        return(
          <div>
            <Row >
              <Col xs={12}>
                <h4>Подздравляем! Вы прошли тест!</h4>
              </Col>
            </Row>
            <Row >
              <Col xs={12}>
                <div className="border-bottom">
                Вы правильно ответили на {this.state.correctAnswersCount} из {this.state.questionsCount} вопросов.
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={3}>
                <FormGroup style={{display: 'flex',    alignItems: 'center'}}>
                  <ControlLabel style={{marginRight: 10}}>Телефон</ControlLabel>
                    <InputMask className="form-control"
                     mask="+7 (999) 999-99-99"
                     onChange={this.onPhoneChange}
                     value={ this.props.attemptData.get('phone') || '' }/>
                </FormGroup>
              </Col>
              <Col xs={12} md={3}>
                <Button onClick={this.submitTestResultsCallMe} disabled={!this.state.phoneValid || this.props.busy} bsStyle="primary" style={{width: '100%'}}>
                  Хочу учиться!
                </Button>
              </Col>
              <Col xs={12} md={3}>
                <Button onClick={this.submitTestResultsDontCall} disabled={this.props.busy} style={{width: '100%'}}>
                  Мне было просто интересно
                </Button>
              </Col>
            </Row>
          </div>
        );
    }
}
Skilltest.propTypes = {
    questions: React.PropTypes.object,
    attemptData: React.PropTypes.object,
    results: React.PropTypes.object,
    restart: React.PropTypes.func.isRequired,
    submitTestResults: React.PropTypes.func,
    changeExamineeInfo: React.PropTypes.func,
    busy: React.PropTypes.bool,
};
export default connect(
  (state)=>({
      questions: state.getIn(['skilltest', 'questions']),
      results: state.getIn(['skilltest', 'attempt', 'results']),
      attemptData: state.getIn(['skilltest', 'attempt', 'data']),
      busy: state.getIn(['ajaxStatus', 'posting']),
  }), dispatch=>({
      changeExamineeInfo(field, value) {
          changeExamineeInfo(dispatch, field, value);
      },
      submitTestResults(data, isInterested) {
          submitTestResults(dispatch, data, isInterested);
      }
  })
  )(Skilltest);
