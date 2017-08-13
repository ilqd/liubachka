import React from 'react';
import { connect } from 'react-redux';
import {FormControl, Row, Col, Button, Checkbox} from 'react-bootstrap';
import {setAnswerText, setAnswerCorrert, removeAnswer, setCorrectAnswerText } from '@/store/skilltestCreator.store';
class CreateAnswerClass extends React.Component {
    constructor(props) {
        super(props);
        this.setAnswerText = this.setAnswerText.bind(this);
        this.setAnswerCorrert = this.setAnswerCorrert.bind(this);
        this.removeAnswer = this.removeAnswer.bind(this);
    }
    setAnswerText(e) {
        this.props.setAnswerText(e.target.value);
    }
    setAnswerCorrert() {
        this.props.setAnswerCorrert(!this.props.answer.get('correct'));
    }
    removeAnswer() {
        this.props.removeAnswer();
    }

    render() {
        return (
    <Row>
    <hr/>
      <Col xs={12} >
        <Row>
          <Col md={this.props.isTextAnswer ? 12 : 8} xs={12}>
            <FormControl
              value={this.props.isTextAnswer ? this.props.answer : this.props.answer.get('text')}
              onChange={this.setAnswerText}
              id="text"
              type="text"
              placeholder="Ответ"
            />
          </Col>
          {this.props.isTextAnswer ? '' :
          <Col md={4} xs={12}>
            <Checkbox
              style={{paddingLeft: 5, float: 'left'}}
              checked={this.props.answer.get('correct')}
              onChange={this.setAnswerCorrert}>
              Правильный
            </Checkbox>
            <Button onClick={this.removeAnswer} style={{float: 'right'}}>
              Удалить ответ
            </Button>
          </Col>
        }
        </Row>
      </Col>
    </Row>
    );
    }
}
CreateAnswerClass.propTypes = {
    setAnswerText: React.PropTypes.func,
    setAnswerCorrert: React.PropTypes.func,
    answer: React.PropTypes.object,
    qIdx: React.PropTypes.number,
    aIdx: React.PropTypes.number,
    removeAnswer: React.PropTypes.func,
    isTextAnswer: React.PropTypes.bool,
};
export default connect(()=>({}),
(dispatch, props)=>({
    setAnswerText(text) {
        if (props.isTextAnswer) {
            setCorrectAnswerText(dispatch, props.qIdx, props.aIdx, text);
        }else{
            setAnswerText(dispatch, props.qIdx, props.aIdx, text);
        }
    },
    setAnswerCorrert(value) {
        setAnswerCorrert(dispatch, props.qIdx, props.aIdx, value);
    },
    removeAnswer() {
        removeAnswer(dispatch, props.qIdx, props.aIdx);
    }
}))(CreateAnswerClass);
