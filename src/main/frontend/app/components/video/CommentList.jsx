import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {loadComments} from '@/store/videoComment.store.js';
import {List} from 'immutable';
import './video.css';
import Comment from './Comment';
class CommentList extends React.PureComponent {
    componentWillMount() {
        this.props.loadComments(this.props.videoDBId);
    }
    componentWillReceiveProps(props) {
        if (this.props.videoDBId != props.videoDBId || (this.props.newComment && props.newComment === undefined)) {
            this.props.loadComments(props.videoDBId);
        }
    }
    render() {
        return(
        <Row>
          <Col xs={12}>
            {this.props.data.map(elem=>(<Comment key={elem.get('id')} elem={elem}/>))}
          </Col>
        </Row>);
    }
}
CommentList.propTypes = {
    loadComments: React.PropTypes.func,
    data: React.PropTypes.object,
};
export default connect((state, props)=>({
    newComment: state.getIn(['video', 'comments', 'reply']),
    data: state.getIn(['video', 'comments', props.videoDBId], new List()),
}), (dispatch)=>({
    loadComments(videoDBId) {
        loadComments(dispatch, videoDBId);
    }
}))(CommentList);
