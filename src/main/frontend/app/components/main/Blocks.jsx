import React from 'react';
import { Col, Row, Glyphicon} from 'react-bootstrap';
import Block from './Block.jsx';
export default class Blocks extends React.Component {
    render() {
        return (
      <div>
        <Row className="blocks">
          <Col md={12} lg={6}>
            <Block>
              <h2>Перейди на новый уровень за 3 месяца!</h2>
            </Block>
          </Col>
          <Col md={4} lg={2}>
            <Block className="red">
              <h2>IELTS</h2>
            </Block>
          </Col>
          <Col md={4} lg={2}>
            <Block className="cyan">
              <h4><b>БИЗНЕС АНГЛИЙСКИЙ</b></h4>
            </Block>
          </Col>
          <Col md={4} lg={2}>
            <Block className="lightbrown leaf1">
              <Glyphicon glyph="bookmark" className="leafbookmark"/>
              <h4><b>СЕМИНАР</b><br/>как грамотно писать e-mail</h4>
            </Block>
          </Col>
        </Row>

        <Row className="blocks">
          <Col md={4} lg={2}>
            <Block className="green leaf2">
              <Glyphicon glyph="bookmark" className="leafbookmark"/>
              <h4><b>СЕМИНАР</b><br/>подготовка к job interview</h4>
            </Block>
          </Col>
          <Col md={4} lg={2}>
            <Block className="red">
              <h2>TOEFL</h2>
            </Block>
          </Col>
          <Col md={4} lg={2}>
            <Block className="cyan">
              <h4>Английский на каждый день</h4>
            </Block>
          </Col>
          <Col md={12} lg={6}>
            <Block>
              <h2>Разговорный<br/>клуб</h2>
            </Block>
          </Col>
        </Row>
        <Row className="blocks">
        <Col xs={12}>
          <Block url="skilltest">
            <h2>Пройти тест!</h2>
          </Block>
        </Col>
        </Row>
    </div>
    );
    }
}
