import React from 'react';
import {Button, FormControl, Modal} from 'react-bootstrap';
import './video.css';
import {connect} from 'react-redux';
import {addComment, typeComment} from '@/store/videoComment.store.js';
import {clearMessage, SUCCESS_MESSAGE} from '@/store/net.store.js';

class NewComment extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentWillReceiveProps(props) {
        if (props.netMessage == SUCCESS_MESSAGE) {
            props.clearMessage();
            props.commentPosted();
        }
    }
    hideModal() {
        this.props.clearMessage();
    }
    onChange(e) {
        this.props.typeComment(e.target && e.target.value || '');
    }
    submit() {
        this.props.addComment({text: this.props.value, video: this.props.videoDBId, parent: this.props.parent});
    }
    render() {
        return (<div className="video-comment-container">
        <Modal show={this.props.netMessage && this.props.netMessage != SUCCESS_MESSAGE} onHide={this.hideModal}>
          <Modal.Body>
            {this.props.netMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Оки доки</Button>
          </Modal.Footer>
        </Modal>
          <FormControl value={this.props.value} onChange={this.onChange} componentClass="textarea" placeholder="Введите комментарий" rows="4" />
          <Button bsStyle="link" disabled={this.props.busy} onClick={this.submit}>Отправить</Button>
        </div>);
    }
}
NewComment.propTypes = {
    value: React.PropTypes.string,
    typeComment: React.PropTypes.func,
    addComment: React.PropTypes.func,
    clearMessage: React.PropTypes.func,
    netMessage: React.PropTypes.string,
    busy: React.PropTypes.bool,
    videoDBId: React.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    parent: React.oneOfType([React.PropTypes.string, React.PropTypes.number]),
};
export default connect(state=>({
    value: state.getIn(['video', 'comments', 'new'], ''),
    netMessage: state.getIn(['ajaxStatus', 'message']),
    busy: state.getIn(['ajaxStatus', 'posting']),
}), dispatch=>({
    typeComment(value) {
        typeComment(dispatch, value);
    },
    addComment(value) {
        addComment(dispatch, value);
    },
    clearMessage() {
        clearMessage(dispatch);
    }
}))(NewComment);
