import React from 'react';
import {Col, Row, Glyphicon, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loadVideos} from '@/store/videoList.store.js';
import {LinkContainer} from 'react-router-bootstrap';
import {List} from 'immutable';
import './video.css';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery';

class VideoBlock extends React.Component {
    constructor(props) {
        super(props);
        this.openPlayer = this.openPlayer.bind(this);
    }
    openPlayer() {
        window.scrollTo(0, 0);
        this.props.openPlayer(this.props.elem);
    }
    render() {
        return (<div>
            <div className="video-play-container">
              <img src={`https://img.youtube.com/vi/${this.props.elem.get('youtubeId')}/0.jpg`}/>
              <div className="btn btn-link video-play"><Glyphicon onClick={this.openPlayer} glyph="play"/></div>
            </div>
            <div className="video-title">{this.props.elem.get('name')}</div>
            <div className="video-author">{this.props.elem.get('creatorName')}</div>
          </div>
        );
    }
}
VideoBlock.propTypes = {
    elem: React.PropTypes.object,
    openPlayer: React.PropTypes.func,
};
//eslint-disable-next-line
class VideoList extends React.Component {
    constructor(props) {
        super(props);
        this.openPlayer = this.openPlayer.bind(this);
        this.closePlayer = this.closePlayer.bind(this);
        this.onReady = this.onReady.bind(this);
        this.showList = this.showList.bind(this);
        this.initWheel = this.initWheel.bind(this);
        this.state = {showPlayer: false, showList: false};
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
    showList() {
        this.setState({showList: !this.state.showList});
    }
    initWheel() {
        if (this.wheelInited) {
            return;
        }
        const elem = $('.video-carousel');
        const that = this;
        if (elem.length > 0) {
            elem.bind('mousewheel', e=> {
                if (e.originalEvent.wheelDelta / 120 > 0) { // up
                    that.refs.slick.slickPrev();
                }else{// down
                    that.refs.slick.slickNext();
                }
            });
            this.wheelInited = true;
        }
    }
    render() {
        const show = this.state.showPlayer;

        const list = this.props.data.map((e, idx)=><div key={idx} className="video-block"><VideoBlock elem={e}  openPlayer={this.openPlayer}/></div>);


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
          </Col>
        </Row>);
        this.initWheel();

        return (<div className="video-page">
          <Row >
          {show && <Col xs={12}>
          {player}
          </Col>}
          <Col xs={12}>
          <Slider className="video-carousel" ref="slick" arrows swipeToSlide responsive={ [
             { breakpoint: 768, settings: { slidesToShow: 3 } },
             { breakpoint: 1024, settings: { slidesToShow: 5 } },
             { breakpoint: 1920, settings: { slidesToShow: 7 } } ]}>
          {list}
          </Slider >
          <LinkContainer to={'/video/upload'}><Button bsStyle="link" className="upload-video-button"><Glyphicon glyph="cloud-upload"/>Загрузить видео</Button></LinkContainer>
          <Button bsStyle="link" onClick={this.showList} className="show-video-list">{`${this.state.showList ? 'Спрятать список' : 'Показать список'}`}</Button>
          </Col>
          </Row>
          {this.state.showList && <Row className="video-row">
              {this.props.data.map((e, idx)=><Col key={idx} xs={12} sm={4} md={3} lg={2} className="video-block"><VideoBlock show={show} openPlayer={this.openPlayer} elem={e}/></Col>)}
            </Row>
          }
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
