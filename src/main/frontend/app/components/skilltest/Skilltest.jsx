import React from 'react';
import { connect } from 'react-redux';
import {loadData} from '@/store/skilltestQuestions.store';
import {finishTest, restartTest} from '@/store/skilltestResults.store';
import {data} from './DataStub.js';
import Question from './Question';
import {Row, Col, Button} from 'react-bootstrap';
import {List} from 'immutable';
import ResultsPage from './ResultsPage';
class Skilltest extends React.Component {
    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
        this.getQuestionsCount = this.getQuestionsCount.bind(this);
        this.state = {questionIdx: 0};
        this.finish = this.finish.bind(this);
        this.restart = this.restart.bind(this);
    }
    componentWillMount() {
        this.props.loadData(data);
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
    render() {
        return(
      !this.props.data || this.props.data.size === 0 ? <div/> :
      <div>
          <Row >
            <Col xs={12}>
              <h2 className="border-bottom">
              {this.props.data.get('testName')}
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
              {this.state.questionIdx >= this.getQuestionsCount() - 1 ?
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
};
export default connect(
  (state)=>({
      data: state.getIn(['skilltest', 'questions']),
      finished: state.getIn(['skilltest', 'results', 'finished']),
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
      }
  })
)(Skilltest);
