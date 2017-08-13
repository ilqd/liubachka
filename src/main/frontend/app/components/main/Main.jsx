import React from 'react';
import { Col, Row} from 'react-bootstrap';
import CarouselClass from './Carousel.jsx';
import Blocks from './Blocks.jsx';
export default class Main extends React.Component {
    render() {
        return (
    <div>
      <Row>
        <Col xs={12}>
          <CarouselClass/>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Blocks/>
        </Col>
      </Row>
    </div>
    );
    }
}
