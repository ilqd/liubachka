import React from 'react';
import { connect } from 'react-redux';
import {loadData, loadTestTypeData} from '@/store/skilltestQuestions.store';
import {finishTest, restartTest} from '@/store/skilltestResults.store';
import {data} from './DataStub.js';
import Question from './Question';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {List, Map} from 'immutable';
import ResultsPage from './ResultsPage';
import StartPage from './StartPage';
import {goBack} from '@/store/store';
import {clearMessage, NET_ERROR_MESSAGE} from '@/store/net.store.js';
import Progress from './Progress';

class Skilltest extends React.Component {
    constructor(props) {
        super(props);
        this.jumpToQuestion = this.jumpToQuestion.bind(this);
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
        this.getQuestionsCount = this.getQuestionsCount.bind(this);
        this.finish = this.finish.bind(this);
        this.finishAnyway = this.finishAnyway.bind(this);
        this.restart = this.restart.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.hidenotAllAnsweredConfirmation = this.hidenotAllAnsweredConfirmation.bind(this);
        this.state = {questionIdx: 0, notAllAnswered: false};
    }
    componentWillMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.testType) {
            this.props.loadTestTypeData(this.props.match.params.testType);
        }else{
            this.props.loadData(data);
        }
    }
    jumpToQuestion(idx) {
        this.setState({questionIdx: idx});
    }
    back() {
        this.setState({questionIdx: this.state.questionIdx - 1});
    }
    next() {
        this.setState({questionIdx: this.state.questionIdx + 1});
    }
    finish() {
        if (this.getQuestionsCount() - this.props.answersCount <= 0) {
            this.props.finishTest();
        }else{
            this.setState({notAllAnswered: true, triedToFinish: true});
        }
    }
    finishAnyway() {
        this.setState({notAllAnswered: false});
        this.props.finishTest();
    }
    restart() {
        this.setState({questionIdx: 0});
        this.props.restartTest();
    }
    getQuestionsCount() {
        if (this.props.data && this.props.data.size > 0) {
            return this.props.data.get('questions', new List()).size;
        }
        return 0;
    }
    hideModal() {
        this.props.clearMessage();
        if (this.props.netMessage !== NET_ERROR_MESSAGE) {
            this.props.restartTest();
            goBack();
        }
    }
    hidenotAllAnsweredConfirmation() {
        this.setState({notAllAnswered: false});
    }
    render() {
        const questionCount  = this.getQuestionsCount();
        const questionText = this.props.finished ? '' : `, вопрос ${this.state.questionIdx + 1} из ${questionCount}`;
        //eslint-disable-next-line
        return( !this.props.data || this.props.data.size === 0 ? <div/> :
      !(this.props.personId || this.props.personId === 0) ? <StartPage/> :
      <div>
        <Modal show={this.props.netMessage} onHide={this.hideModal}>
          <Modal.Body>
            {this.props.netMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Спасибо</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.notAllAnswered} onHide={this.hidenotAllAnsweredConfirmation}>
          <Modal.Body>
            Вы не ответили на {questionCount - this.props.answersCount} вопросов! Продолжить?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.finishAnyway}>Да</Button>
            <Button onClick={this.hidenotAllAnsweredConfirmation}>Нет</Button>
          </Modal.Footer>
        </Modal>
          <Row >
            <Col xs={12}>
              <h2 className="border-bottom">
              {this.props.data.get('testName')}{questionText}
              </h2>
            </Col>
          </Row>
          {this.props.finished ?
          <ResultsPage restart={this.restart}/>
            :
          <div>
            <Row >
              <Col xs={12} className={`${this.state.triedToFinish ? 'tried-to-finish' : ''}`} >
                <Progress jumpToQuestion={this.jumpToQuestion} currentIdx={this.state.questionIdx}/>
              </Col>
            </Row>
            <Question qIdx={this.state.questionIdx}/>
            <Row >
              <Col xs={6}>
                {this.state.questionIdx == 0 ? '' :
                <Button onClick={this.back} style={{float: 'right'}}>
                Назад
                </Button>
                }
              </Col>
              <Col xs={6}>
              {this.state.questionIdx >= questionCount - 1 ?
                <Button onClick={this.finish} style={{float: 'left'}}>
                Завершить!
                </Button> :
                <Button onClick={this.next} style={{float: 'left'}}>
                Вперёд
                </Button>
                }
              </Col>
            </Row>
          </div>
       }
      </div>
    );
    }
}
Skilltest.propTypes = {
    loadData: React.PropTypes.func,
    data: React.PropTypes.object,
    finishTest: React.PropTypes.func,
    restartTest: React.PropTypes.func,
    finished: React.PropTypes.bool,
    match: React.PropTypes.object,
    loadTestTypeData: React.PropTypes.func,
    personId: React.PropTypes.number,
    clearMessage: React.PropTypes.func,
    netMessage: React.PropTypes.string,
    answersCount: React.PropTypes.number,
};
export default connect(
  (state)=>({
      data: state.getIn(['skilltest', 'questions']),
      finished: state.getIn(['skilltest', 'attempt', 'data', 'finished']),
      personId: state.getIn(['skilltest', 'attempt',  'data', 'id']),
      netMessage: state.getIn(['ajaxStatus', 'message']),
      answersCount: state.getIn(['skilltest', 'attempt', 'results'], new Map()).size || 0,
  }),
  (dispatch)=>({
      loadData(dataPassed) {
          loadData(dispatch, dataPassed);
      },
      finishTest() {
          finishTest(dispatch);
      },
      restartTest() {
          restartTest(dispatch);
      },
      loadTestTypeData(type) {
          loadTestTypeData(dispatch, type);
      },
      clearMessage() {
          clearMessage(dispatch);
      },
  })
)(Skilltest);
