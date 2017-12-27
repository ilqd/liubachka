import React from 'react';
import $ from 'jquery';
import Slider from 'react-slick';
import VideoBlock from './VideoBlock';

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

export default class VideoCarousel extends React.PureComponent {

    constructor(props) {
        super(props);
        this.initWheel = this.initWheel.bind(this);
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
        this.initWheel();
        return(
      <Slider className="video-carousel" ref="slick"  {...sliderSettings}
         >
      {this.props.data.map(e=><div key={e.get('id')} className="video-block"><VideoBlock elem={e}  openPlayer={this.props.openPlayer}/></div>)}
      </Slider >
    );
    }
}
