import React from 'react';
import { connect } from 'react-redux';
import {FormControl, Row, Col, Button} from 'react-bootstrap';
import {setQuestionText, setQuestionValue, addAnswer, removeQuestion, addTextAnswer } from '@/store/skilltestCreator.store';
import CreateAnswer from './CreateAnswer';
import {List} from 'immutable';
class CreateTestClass extends React.Component {
    constructor(props) {
        super(props);
        this.setQuestionText = this.setQuestionText.bind(this);
        this.setQuestionValue = this.setQuestionValue.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
    }
    setQuestionText(e) {
        this.props.setQuestionText(e.target.value);
    }
    setQuestionValue(e) {
        this.props.setQuestionValue(e.target.value);
    }
    addAnswer() {
        if (this.props.question.get('answerType') == 'TEXT') {
            this.props.addTextAnswer();
        }else{
            this.props.addAnswer();
        }
    }
    removeQuestion() {
        this.props.removeQuestion();
    }
    render() {
        return (
    <Row className="created-answer">
      <Col xs={12} >
        <Row>
          <Col xs={12} md={1}>
          {this.props.qIdx + 1}.
          </Col>
          <Col xs={12} md={8}>
            <FormControl
              value={this.props.question.get('question')}
              onChange={this.setQuestionText}
              id="testName"
              type="text"
              placeholder="Вопрос"
            />
          </Col>
          <Col xs={12} md={3}>
            <FormControl
              value={this.props.question.get('pointsAwarded')}
              onChange={this.setQuestionValue}
              id="pointsAwarded"
              type="number"
              placeholder="Стоимость правильного ответа"
            />
          </Col>
        </Row>
        {this.props.question.get('correctAnswers', new List()).map((a, idx)=>
        <CreateAnswer qIdx={this.props.qIdx} aIdx={idx} answer={a} isTextAnswer/>
        )}
        {this.props.question.get('answers', new List()).map((a, idx)=>
        <CreateAnswer qIdx={this.props.qIdx} aIdx={idx} answer={a}/>
        )}
        <Row>
          <Col xs={12}>
            <Button onClick={this.addAnswer}>
              Добавить ответ
            </Button>
          <Button onClick={this.removeQuestion} style={{marginLeft: 5}}>
            Удалить вопрос
          </Button>
          </Col>
        </Row>
      </Col>
    </Row>
    );
    }
}
CreateTestClass.propTypes = {
    setQuestionText: React.PropTypes.func,
    setQuestionValue: React.PropTypes.func,
    question: React.PropTypes.object,
    qIdx: React.PropTypes.number,
    addAnswer: React.PropTypes.func,
    removeQuestion: React.PropTypes.func,
    addTextAnswer: React.PropTypes.func,
};
export default connect(()=>({}),
(dispatch, props)=>({
    setQuestionText(text) {
        setQuestionText(dispatch, props.qIdx, text);
    },
    setQuestionValue(value) {
        setQuestionValue(dispatch, props.qIdx, value);
    },
    addAnswer() {
        addAnswer(dispatch, props.qIdx);
    },
    removeQuestion() {
        removeQuestion(dispatch, props.qIdx);
    },
    addTextAnswer() {
        addTextAnswer(dispatch, props.qIdx);
    }
}))(CreateTestClass);
