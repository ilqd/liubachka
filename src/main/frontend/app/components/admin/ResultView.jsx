import React from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import {Question} from '../skilltest/Question';
import {fromJS, List} from 'immutable';
export default class ResultView extends React.Component {
    render() {
        let questions = [];
        let testname;
        if (this.props.data && this.props.data.get('testSnapShotDto') && this.props.data.get('resultsSnapShotDto')) {
            const test = fromJS(JSON.parse(this.props.data.get('testSnapShotDto')));
            testname = (<Row>
              <Col xs={12}>
              <h2 className="border-bottom">
                {test.get('testName')}
              </h2>
              </Col>
            </Row>);
            const answers = fromJS(JSON.parse(this.props.data.get('resultsSnapShotDto')));
            questions = test.get('questions', new List()).map((q, idx)=>{
                return (<Question key={idx} resultsViewMode data={q} results={answers.get(idx.toString())}/>);
            }
          );
        }
        return (<div className="result-view">
          {testname}
          <Row>
            <Col xs={12}>
            {questions}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button onClick={this.props.back}>Назад</Button>
            </Col>
          </Row>
        </div>);
    }
}
ResultView.propTypes = {
    back: React.PropTypes.func,
    data: React.PropTypes.object,
};
