import React from 'react';
import {Col, Row, Button, Glyphicon} from 'react-bootstrap';
import './video.css';
import {connect} from 'react-redux';
import {reply} from '@/store/videoComment.store.js';
import {Map, List} from 'immutable';
import NewComment from './NewComment';

class Comment extends React.PureComponent {
    constructor(props) {
        super(props);
        this.openReply = this.openReply.bind(this);
        this.hideComment = this.hideComment.bind(this);
    }
    openReply() {
        this.props.reply();
    }
    hideComment() {

    }
    render() {
        return(
      <Row className="comment" key={this.props.elem.get('id')}>
        <Col xs={12}>
          <div className="comment-container">
            <div className="comment-info">
              <span className="comment-author">
                {this.props.elem.get('authorName')}
              </span>
              <span className="comment-date">
                {new Date(this.props.elem.get('date')).toLocaleString()}
              </span>
              <span>
              <Button title="Ответить" bsStyle="link" className="comment-reply-button" onClick={this.openReply}>
                <Glyphicon glyph="share-alt"/>
              </Button>
              </span>
            </div>
            <div className="comment-text">
                {this.props.elem.get('text') || ''}
            </div>
          </div>
          {this.props.elem.get('children', new List()).map(child=>(<ConnectedComment key={child.get('id')} elem={child}/>))}
          {this.props.replyComment.get('parent') === this.props.elem.get('id') &&
          <NewComment parent={this.props.elem.get('id')} commentPosted={this.hideComment}/>}
          {this.props.elem.get('children', new List()).size == 0 && <hr/>}
        </Col>
      </Row>
    );
    }
}

const ConnectedComment = connect(state=>({
    replyComment: state.getIn(['video', 'comments', 'reply'], new Map()),
}), (dispatch, props)=>({
    reply() {
        reply(dispatch, props.elem.get('id'));
    }
}))(Comment);
export default ConnectedComment;
