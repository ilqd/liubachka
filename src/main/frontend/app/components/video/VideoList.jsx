import React from 'react';
import {Col, Row, Glyphicon, Button, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loadVideos, setHidden} from '@/store/videoList.store.js';
import {LinkContainer} from 'react-router-bootstrap';
import {List} from 'immutable';
import './video.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {loadData as loadCategories} from '@/store/adminVideoCategoryList.store.js';

import VideoBlock from './VideoBlock';
import VideoPlayer from './VideoPlayer';
import VideoCarousel from './VideoCarousel';

class VideoList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.openPlayer = this.openPlayer.bind(this);
        this.closePlayer = this.closePlayer.bind(this);
        this.showList = this.showList.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.state = {showPlayer: false, showList: false, savedYScroll: 0, data: this.filterData(props)};
    }
    componentWillMount() {
        this.props.loadCategories();
        this.props.loadVideos();
        this.setState({data: this.filterData(this.props)});
    }
    componentWillReceiveProps(props) {
        if (this.state.video && props.data != this.props.data) {
            const video = props.data.find(e=>e.get('id') == this.state.video.get('id'));
            this.setState({video});
        }
        if (this.props.data != props.data) {
            this.setState({data: this.filterData(props)});
        }
    }
    selectCategory(e) {
        if (e && e.target && e.target.value) {
            this.setState({category: e.target.value, showList: true});
        }else{
            this.setState({category: undefined});
        }
    }
    selectUser(e) {
        if (e && e.target && e.target.value) {
            this.setState({user: e.target.value, showList: true});
        }else{
            this.setState({user: undefined});
        }
    }
    filterData(props) {
        return props.data && props.data.filter(e=>!e.get('hidden')) || new List();
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

    render() {
        const show = this.state.showPlayer;
        return (<div className="video-page">
          <Row className="video-carousel-row">
            <Col xs={12}>
              <VideoCarousel data={this.state.data} openPlayer={this.openPlayer}/>
              <div className="video-button-container">
                <LinkContainer to={'/video/upload'}><Button bsStyle="link" className="video-button" title="Загрузить видео">
                  <Glyphicon glyph="cloud-upload"/>
                </Button></LinkContainer>
                <FormControl className="video-list-category" componentClass="select" onChange={this.selectCategory}>
                  <option value={undefined}/>
                  {this.props.categories.map(e=><option key={e.get('id')} value={e.get('id')}>{e.get('name')}</option>)}
                </FormControl>
                <FormControl
                  value={this.state.user}
                  onChange={this.selectUser}
                  id="creator"
                  type="text"
                  placeholder="Создатель"
                  className="video-list-category"
                />
                <Button bsStyle="link" onClick={this.showList} className="video-button show-video-list" title={`${this.state.showList ? 'Спрятать список' : 'Показать список'}`}>
                  <Glyphicon glyph={`${!this.state.showList ? 'chevron-up' : 'chevron-down'}`}/>
                </Button>
              </div>
            </Col>
          </Row>
          {this.state.showList && <Row className="video-row">
              {this.state.data
              .filter(e=>this.state.category === undefined ? true : e.get('category') == this.state.category)
              .filter(e=>!this.state.user ? true : e.get('creatorName', '').toLowerCase().includes(this.state.user.toLowerCase()))
              .map(e=><Col key={e.get('id')} xs={12} sm={4} md={3} lg={2} className="video-block">
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
    categories: React.PropTypes.object,
    loadCategories: React.PropTypes.func,
};
export default connect(state=>({
    data: state.getIn(['video', 'list'], new List()),
    busy: state.getIn(['ajaxStatus', 'posting']),
    categories: state.getIn(['admin', 'videoCategory', 'list'], new List()),
}), dispatch=>({
    loadVideos() {
        loadVideos(dispatch);
    },
    setHidden(id, value) {
        setHidden(dispatch, id, value);
    },
    loadCategories() {
        loadCategories(dispatch);
    },
}))(VideoList);
