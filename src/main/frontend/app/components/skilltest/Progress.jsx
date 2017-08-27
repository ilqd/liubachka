import React from 'react';
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
class ProgressClass extends React.Component {
    render() {
        return (<div className="progress-block border-bottom" style={{padding: '6px 0 7px 0'}}>
          {this.props.questions.map((q, idx)=>
            <span key={idx}
            className={`progress-element ${this.props.answers.get(idx) !== undefined ? 'answered ' : ' '}
            ${this.props.currentIdx == idx ? 'current-question' : ''}`}
            onClick={()=>this.props.jumpToQuestion(idx)}>
            {idx + 1}
            </span>
          )}
        </div>);
    }
}
ProgressClass.propTypes = {
    questions: React.PropTypes.object,
    answers: React.PropTypes.object,
    jumpToQuestion: React.PropTypes.func,
    currentIdx: React.PropTypes.number,
};
export default connect(state=>({
    questions: state.getIn(['skilltest', 'questions', 'questions'], new List()),
    answers: state.getIn(['skilltest', 'attempt', 'results'], new Map()),
}))(ProgressClass);
