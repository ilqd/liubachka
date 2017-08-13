import React from 'react';
import london1 from '../../res/london1.png';
import london2 from '../../res/london2.png';
import london3 from '../../res/london3.png';


export default class CarouselClass extends React.Component {
    render() {
        return (
        <div className="carousel slide" data-ride="carousel" id="londonCarousel">
          <h3 className="carouseltitle">DO U <i>SPLASH</i> ENGLISH?</h3>
          <ol className="carousel-indicators">
            <li data-target="#londonCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#londonCarousel" data-slide-to="1"></li>
            <li data-target="#londonCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="item active">
              <img src={london1} alt="London 1"/>
            </div>
            <div className="item">
              <img src={london2} alt="London 2"/>
            </div>
            <div className="item">
              <img src={london3} alt="London 3"/>
            </div>
          </div>
          <a className="left carousel-control" href="#londonCarousel" data-slide="prev"> <span className="glyphicon glyphicon-chevron-left"></span> <span className="sr-only">Previous</span> </a>
          <a className="right carousel-control" href="#londonCarousel" data-slide="next"> <span className="glyphicon glyphicon-chevron-right"></span> <span className="sr-only">Next</span> </a>
        </div>
    );
    }
}
