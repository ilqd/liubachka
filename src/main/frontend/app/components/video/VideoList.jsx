import React from 'react';
import {Col, Row, Glyphicon, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loadVideos} from '@/store/videoList.store.js';
import {LinkContainer} from 'react-router-bootstrap';
import {List} from 'immutable';
import './video.css';
import YouTube from 'react-youtube';

class VideoBlock extends React.Component {
    constructor(props) {
        super(props);
        this.openPlayer = this.openPlayer.bind(this);
    }
    openPlayer() {
        this.props.openPlayer(this.props.elem);
    }
    render() {
        const show = this.props.show;
        return (<Col xs={12}  sm={show ? 12 : 4} lg={show ? 12 : 3}>
    <div className="video-block" onClick={this.openPlayer}>
      <img src={`https://img.youtube.com/vi/${this.props.elem.get('youtubeId')}/0.jpg`}/>
        <div className="video-title">{this.props.elem.get('name')}</div>
        <div className="video-author">{this.props.elem.get('creatorName')}</div>
      </div>
    </Col>);
    }
}
VideoBlock.propTypes = {
    elem: React.PropTypes.object,
    openPlayer: React.PropTypes.func,
    show: React.PropTypes.bool,
};
//eslint-disable-next-line
class VideoList extends React.Component {
    constructor(props) {
        super(props);
        this.openPlayer = this.openPlayer.bind(this);
        this.closePlayer = this.closePlayer.bind(this);
        this.onReady = this.onReady.bind(this);
        this.state = {showPlayer: false};
    }
    componentWillMount() {
        this.props.loadVideos();
    }
    openPlayer(elem) {
        this.setState({showPlayer: true, videoId: elem.get('youtubeId')});
    }
    closePlayer() {
        this.setState({showPlayer: false});
    }
    onReady(event) {
        event.target.pauseVideo();
    }
    render() {
        const show = this.state.showPlayer;


        const uploadBlock = (<LinkContainer to={'/video/upload'}>
          <div className="video-block upload-new">
            <Glyphicon glyph="plus"/>
          </div>
        </LinkContainer>);


        const list = (<Row className="video-row">
        <Col xs={12} sm={show ? 12 : 4} lg={show ? 12 : 3}>
        {uploadBlock}
        </Col>
        {this.props.data.map((e, idx)=><VideoBlock key={idx} show={show} openPlayer={this.openPlayer} elem={e}/>)}
        </Row>);


        const opts = {
            playerVars: {
                height: '360',
                width: '640',
            }
        };
        const player = (<Row className="video-player">
        <Col xs={12}>
          <YouTube
            videoId={this.state.videoId}
            opts={opts}
            onReady={this.onReady}
          />
          <Button onClick={this.closePlayer}>
            <Glyphicon glyph="chevron-left"/>
          </Button>
          </Col>
        </Row>);


        return (<div className="video-page">
          <Row>
          {show && <Col xs={12} md={8}>
          {player}
          </Col>}
          <Col xs={12} md={show ? 4 : 12}>
          {list}
          </Col>
          </Row>
        </div>);
    }
}
VideoList.propTypes = {
    loadVideos: React.PropTypes.func,
    data: React.PropTypes.object,
};
export default connect(state=>({
    data: state.getIn(['video', 'list'], new List()),
}), dispatch=>({
    loadVideos() {
        loadVideos(dispatch);
    }
}))(VideoList);
