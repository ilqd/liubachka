import React from 'react';
import {Col, Row, Glyphicon, Button} from 'react-bootstrap';
import './video.css';
import YouTube from 'react-youtube';
import $ from 'jquery';
import NewComment from './NewComment';
import CommentList from './CommentList';
import {isAdmin} from '../Util';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {create, clear} from '@/store/videoComment.store.js';
class VideoPlayer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onReady = this.onReady.bind(this);
        this.switchShowComment = this.switchShowComment.bind(this);
        this.hideComment = this.setHidden.bind(this);
        this.setHidden = this.setHidden.bind(this);
        this.opts = {
            playerVars: {
                height: '360',
                width: '640',
                rel: 0,
                controls: 2,
                modestbranding: 1,
            }
        };
        this.state = {showComment: false};
    }
    componentDidMount() {
        this.scroll();
    }
    componentWillReceiveProps(props) {
        if (!this.props.video || this.props.video.get('id') != props.video.get('id')) {
            this.scroll();
        }
    }
    setHidden() {
        this.props.setHidden(this.props.video.get('id'), !this.props.video.get('hidden'));
    }
    hideComment() {
        this.props.clear();
    }
    switchShowComment() {
        this.props.create();
    }
    onReady(event) {
        event.target.pauseVideo();
    }
    scroll() {
        setTimeout(()=> {
            const elem = $('.video-player-container');
            if (elem.length > 0) {
                $('.video-player-container')[0].scrollIntoView();
            }
        }, 200);
    }
    render() {
        const stubArray = [];
        for (let i = 0; i < 10; i++) {
            stubArray.push(i);
        }
        const showDelete = isAdmin() || this.props.userId == this.props.video.get('creator');
        return (<div>
        <Row className="video-player">
          <Col xs={12} className="video-player-col">
            <YouTube
              className="video-player-iframe"
              videoId={this.props.video.get('youtubeId')}
              opts={this.opts}
              onReady={this.onReady}
            />
            </Col>
          </Row>
          <Row>
            {this.props.video.get('name') && <Col xs={12}>
              <span className="video-details-name">{this.props.video.get('name')}</span>
              {showDelete && <Button bsStyle="link" disabled={this.props.busy} className="video-delete-button" onClick={this.setHidden}
                title={`${this.props.video.get('hidden') ? 'Восстановить' : 'Удалить'}`}>
                <Glyphicon glyph={`${this.props.video.get('hidden') ? 'repeat' : 'trash'}`}/>
              </Button>}
            </Col> }
            <Col xs={12}>
              <span className="video-details-creator-label">Загрузил:</span>
              <span className="video-details-creator-name">{this.props.video.get('creatorName')}</span>
              <span className="video-details-creation-date">{new Date(this.props.video.get('uploadDate')).toLocaleString()}</span>
            </Col>
            <Col xs={12}>
              <span className="video-details-description-label">Описание:</span>
              <span className="video-details-description">{this.props.video.get('description')}</span>
            </Col>
            <Col xs={12}>
              <div className="video-button-container">
                <div>
                  <Button bsStyle="link" className="video-button" onClick={this.switchShowComment} title="Комментировать">
                    <Glyphicon glyph="comment"/>
                  </Button>
                  <Button bsStyle="link" onClick={this.props.closePlayer} className="video-button" title="Закрыть видео">
                    <Glyphicon glyph="home"/>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          {this.props.replyComment.get('video') === this.props.video.get('id') && <Row key={this.props.video.get('id')}>
            <Col xs={12}>
              <NewComment videoDBId={this.props.video.get('id')} commentPosted={this.hideComment}/>
            </Col>
          </Row>}
          <CommentList videoDBId={this.props.video.get('id')}/>
        </div>
        );
    }
}
VideoPlayer.propTypes = {
    video: React.PropTypes.object,
    closePlayer: React.PropTypes.func,
    busy: React.PropTypes.bool,
    userId: React.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    videoDBId: React.oneOfType([React.PropTypes.string, React.PropTypes.number]),
};
export default connect(state=>({
    replyComment: state.getIn(['video', 'comments', 'reply'], new Map()),
    userId: state.getIn(['session', 'userId'], '')
}), (dispatch, props)=>({
    create() {
        create(dispatch, props.video.get('id'));
    },
    clear() {
        clear(dispatch);
    }

}))(VideoPlayer);
