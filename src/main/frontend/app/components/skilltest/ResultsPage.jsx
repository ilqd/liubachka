import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Button} from 'react-bootstrap';
import {List, Map, Set} from 'immutable';
class Skilltest extends React.Component {
    constructor(props) {
        super(props);
        this.getQuestionsCount = this.getQuestionsCount.bind(this);
        this.getCorrectAnswersCount = this.getCorrectAnswersCount.bind(this);
        this.checkSelectOneQuestion = this.checkSelectOneQuestion.bind(this);
        this.checkSelectManyQuestion = this.checkSelectManyQuestion.bind(this);
        this.checkSelectTextQuestion = this.checkSelectTextQuestion.bind(this);
        this.state = {questionsCount: 0, correctAnswersCount: 0};
    }
    componentWillMount() {
        this.setState({questionsCount: this.getQuestionsCount(),
    correctAnswersCount: this.getCorrectAnswersCount()});
    }
    componentWillReceiveProps(props) {
        this.setState({questionsCount: this.getQuestionsCount(props),
      correctAnswersCount: this.getCorrectAnswersCount(props)});
    }
    getQuestionsCount(props = this.props) {
        if (props.data && props.data.size > 0) {
            return props.data.get('questions', new List()).size;
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
    checkSelectTextQuestion(question, answer = '') {
        const correctAnswers = question.get('correctAnswers').toJS();
        return correctAnswers.findIndex(a => a.toLowerCase() === answer.toLowerCase()) > -1;
    }
    getCorrectAnswersCount(props = this.props) {
        let count = 0;
        if (props.data && props.data.size > 0) {
            props.data.get('questions', new List()).forEach((question, idx)=>{
                const answerGiven = props.results.get(idx);
                let isCorrect = false;
                switch (question.get('answerType')) {
                    case 'selectOne':
                        isCorrect = this.checkSelectOneQuestion(question, answerGiven);
                        break;
                    case 'selectMany':
                        isCorrect = this.checkSelectManyQuestion(question, answerGiven);
                        break;
                    case 'text':
                        isCorrect = this.checkSelectTextQuestion(question, answerGiven);
                        break;
                    default:
                        break;
                }
                if (isCorrect) {
                    count++;
                }
            });
        }
        return count;
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
            <Row >
              <Col xs={6} style={{float: 'right'}}>
                <Button onClick={this.props.restart}>
                  Пройти тест заново
                </Button>
              </Col>
            </Row>
          </div>
        );
    }
}
Skilltest.propTypes = {
    data: React.PropTypes.object,
    results: React.PropTypes.func,
    restart: React.PropTypes.func.isRequired,
};
export default connect(
  (state)=>({
      data: state.getIn(['skilltest', 'questions']),
      results: state.getIn(['skilltest', 'results']),
  })
)(Skilltest);
