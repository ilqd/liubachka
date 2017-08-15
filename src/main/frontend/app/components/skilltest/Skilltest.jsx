import React from 'react';
import { connect } from 'react-redux';
import {loadData, loadTestTypeData} from '@/store/skilltestQuestions.store';
import {finishTest, restartTest} from '@/store/skilltestResults.store';
import {data} from './DataStub.js';
import Question from './Question';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {List} from 'immutable';
import ResultsPage from './ResultsPage';
import StartPage from './StartPage';
import {goBack} from '@/store/store';
import {clearMessage} from '@/store/net.store.js';

class Skilltest extends React.Component {
    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
        this.getQuestionsCount = this.getQuestionsCount.bind(this);
        this.state = {questionIdx: 0};
        this.finish = this.finish.bind(this);
        this.restart = this.restart.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentWillMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.testType) {
            this.props.loadTestTypeData(this.props.match.params.testType);
        }else{
            this.props.loadData(data);
        }
    }
    back() {
        this.setState({questionIdx: this.state.questionIdx - 1});
    }
    next() {
        this.setState({questionIdx: this.state.questionIdx + 1});
    }
    finish() {
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
        this.props.restartTest();
        goBack();
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
            <Button onClick={this.hideModal}>Оки доки</Button>
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
};
export default connect(
  (state)=>({
      data: state.getIn(['skilltest', 'questions']),
      finished: state.getIn(['skilltest', 'attempt', 'data', 'finished']),
      personId: state.getIn(['skilltest', 'attempt',  'data', 'id']),
      netMessage: state.getIn(['ajaxStatus', 'message']),
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
