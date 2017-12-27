import React from 'react';
import {Col, Row, Glyphicon, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loadVideos, setHidden} from '@/store/videoList.store.js';
import {LinkContainer} from 'react-router-bootstrap';
import {List} from 'immutable';
import './video.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery';
import VideoBlock from './VideoBlock';
import VideoPlayer from './VideoPlayer';

class VideoList extends React.PureComponent {
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
    componentWillReceiveProps(props) {
        if (this.state.video && props.data != this.props.data) {
            const video = props.data.find(e=>e.get('id') == this.state.video.get('id'));
            this.setState({video});
        }
    }
    openPlayer(elem) {
        this.setState({savedYScroll: window.pageYOffset, showPlayer: true, video: elem});
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
        const notHidden = this.props.data.filter(e=>!e.get('hidden'));
        const list = notHidden.map((e, idx)=><div key={idx} className="video-block"><VideoBlock elem={e}  openPlayer={this.openPlayer}/></div>);


        this.initWheel();
        const sliderSettings = {
            infinite: true,
            arrows: false,
            swipeToSlide: true,
            responsive: [
                 { breakpoint: 576, settings: { slidesToShow: 2 } },
                 { breakpoint: 768, settings: { slidesToShow: 3 } },
                 { breakpoint: 1024, settings: { slidesToShow: 5 } },
                 { breakpoint: 1920, settings: { slidesToShow: 7 } } ]
        };
        return (<div className="video-page">
          <Row className="video-carousel-row">
            <Col xs={12}>
              <Slider className="video-carousel" ref="slick"  {...sliderSettings}
                 >
              {list}
              </Slider >
              <div className="video-button-container">
                <LinkContainer to={'/video/upload'}><Button bsStyle="link" className="video-button" title="Загрузить видео">
                  <Glyphicon glyph="cloud-upload"/>
                </Button></LinkContainer>
                <Button bsStyle="link" onClick={this.showList} className="video-button show-video-list" title={`${this.state.showList ? 'Спрятать список' : 'Показать список'}`}>
                  <Glyphicon glyph="list"/>
                </Button>
              </div>
            </Col>
          </Row>
          {this.state.showList && <Row className="video-row">
              {notHidden.map((e, idx)=><Col key={idx} xs={12} sm={4} md={3} lg={2} className="video-block">
                <VideoBlock show={show} openPlayer={this.openPlayer} elem={e} listMode/>
                </Col>)}
          </Row>  }
          {show && <Row>
            <Col xs={12} className="video-player-container">
              <VideoPlayer busy={this.props.busy} video={this.state.video} closePlayer={this.closePlayer} setHidden={this.props.setHidden}/>
            </Col>
          </Row>}
        </div>);
    }
}
VideoList.propTypes = {
    loadVideos: React.PropTypes.func,
    setHidden: React.PropTypes.func,
    data: React.PropTypes.object,
    busy: React.PropTypes.bool,
};
export default connect(state=>({
    data: state.getIn(['video', 'list'], new List()),
    busy: state.getIn(['ajaxStatus', 'posting']),
}), dispatch=>({
    loadVideos() {
        loadVideos(dispatch);
    },
    setHidden(id, value) {
        setHidden(dispatch, id, value);
    }
}))(VideoList);
