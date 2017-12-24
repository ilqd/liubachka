import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import './video.css';

export default class VideoBlock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.openPlayer = this.openPlayer.bind(this);
    }
    openPlayer() {
        this.props.openPlayer(this.props.elem);
    }
    render() {
        return (<div onClick={this.openPlayer}>
            <div className="video-play-container">
              <div className="video-comment-count">
                <span className="video-comment-count-number">{this.props.elem.get('commentCount') || 0}</span>
              </div>
              <img src={`https://img.youtube.com/vi/${this.props.elem.get('youtubeId')}/0.jpg`}/>
              <div className="btn btn-link video-play"><Glyphicon glyph="play"/></div>
            </div>
            <div className={`video-info ${this.props.listMode && 'video-info-list-mode' || ''}`}>
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
