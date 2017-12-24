import React from 'react';
import {Col, Row, Glyphicon, Button} from 'react-bootstrap';
import './video.css';
import YouTube from 'react-youtube';
import $ from 'jquery';
import NewComment from './NewComment';
import CommentList from './CommentList';
export default class VideoPlayer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onReady = this.onReady.bind(this);
        this.switchShowComment = this.switchShowComment.bind(this);
        this.hideComment = this.setShowComment.bind(this, false);
        this.showComment = this.setShowComment.bind(this, true);
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
    setShowComment(bool) {
        this.setState({showComment: bool});
    }
    switchShowComment() {
        this.setState({showComment: !this.state.showComment });
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
        this.scroll();
        return (<div>
        <Row className="video-player">
          <Col xs={12} className="video-player-col">
            <YouTube
              className="video-player-iframe"
              videoId={this.props.videoId}
              opts={this.opts}
              onReady={this.onReady}
            />
            </Col>
          </Row>
          <Row>
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
          {this.state.showComment && <Row key={this.props.videoDBId}>
            <Col xs={12}>
              <NewComment videoDBId={this.props.videoDBId} commentPosted={this.hideComment}/>
            </Col>
          </Row>}
          <CommentList videoDBId={this.props.videoDBId}/>
        </div>
        );
    }
}
VideoPlayer.propTypes = {
    videoId: React.PropTypes.String,
    closePlayer: React.PropTypes.func,
    videoDBId: React.oneOfType([React.PropTypes.string, React.PropTypes.number]),
};
