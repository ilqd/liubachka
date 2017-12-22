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
        this.props.openPlayer(this.props.elem);
    }
    render() {
        return (<div>
            <div className="video-play-container">
              <img src={`https://img.youtube.com/vi/${this.props.elem.get('youtubeId')}/0.jpg`}/>
              <div className="btn btn-link video-play"><Glyphicon onClick={this.openPlayer} glyph="play"/></div>
            </div>
            <div className={`video-info ${this.props.listMode && 'video-info-list-mode'}`}>
              <div className="video-title">{this.props.elem.get('name')}</div>
              <div className="video-author">{this.props.elem.get('creatorName')}</div>
            </div>
          </div>
        );
    }
}
VideoBlock.propTypes = {
    elem: React.PropTypes.object,
    openPlayer: React.PropTypes.func,
    listMode: React.PropTypes.bool,
};

//eslint-disable-next-line
class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.onReady = this.onReady.bind(this);
        this.opts = {
            playerVars: {
                height: '360',
                width: '640',
                rel: 0,
                controls: 2,
                modestbranding: 1,
            }
        };
    }
    componentDidMount() {
        this.scroll();
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
          <Col xs={12}>
            <YouTube
              videoId={this.props.videoId}
              opts={this.opts}
              onReady={this.onReady}
            />
            </Col>
          </Row>
          <Row>
        {stubArray.map(i=><Col xs={11} xsOffset={1} key={i}>Коммент {i}</Col>)}
          </Row>
        </div>
        );
    }
}
VideoPlayer.propTypes = {
    videoId: React.PropTypes.String,
};


//eslint-disable-next-line
class VideoList extends React.Component {
    constructor(props) {
        super(props);
        this.openPlayer = this.openPlayer.bind(this);
        this.closePlayer = this.closePlayer.bind(this);
        this.showList = this.showList.bind(this);
        this.initWheel = this.initWheel.bind(this);
        this.state = {showPlayer: false, showList: false, savedYScroll: 0};
    }
    componentWillMount() {
        this.props.loadVideos();
    }
    openPlayer(elem) {
        this.setState({savedYScroll: window.pageYOffset, showPlayer: true, videoId: elem.get('youtubeId')});
    }
    closePlayer() {
        this.setState({showPlayer: false});
        window.scrollTo(0, this.state.savedYScroll);
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
                    e.preventDefault();
                }else{// down
                    that.refs.slick.slickNext();
                    e.preventDefault();
                }
            });
            this.wheelInited = true;
        }
    }
    render() {
        const show = this.state.showPlayer;

        const list = this.props.data.map((e, idx)=><div key={idx} className="video-block"><VideoBlock elem={e}  openPlayer={this.openPlayer}/></div>);


        this.initWheel();

        return (<div className="video-page">
          <Row >
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
              {this.props.data.map((e, idx)=><Col key={idx} xs={12} sm={4} md={3} lg={2} className="video-block">
              <VideoBlock show={show} openPlayer={this.openPlayer} elem={e} listMode/>
              </Col>)}
          </Row>  }
          {show && <Row>
            <Col xs={12} className="video-player-container">
              <VideoPlayer videoId={this.state.videoId}/>
            </Col>
            <Button bsStyle="link" onClick={this.closePlayer}>Уродливая кнопка закрытия плеера</Button>
          </Row>}
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
