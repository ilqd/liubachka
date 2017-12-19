import React from 'react';
import {connect} from 'react-redux';
import {ProgressBar} from 'react-bootstrap';

const ConnectedProgressBar = (props) => props.percent ? <ProgressBar active bsStyle="success" now={props.percent}/> : '';

ConnectedProgressBar.propTypes = {
    percent: React.PropTypes.string,
};

export default connect(state=>({
    percent: state.getIn(['video', 'uploadProgress', 'percent'], 0),
}))(ConnectedProgressBar);
