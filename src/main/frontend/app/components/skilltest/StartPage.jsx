import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Button} from 'react-bootstrap';
import {FieldGroup} from '../Util.js';
class StartPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit() {
        this.props.startTest();
    }

    render() {
        return (<Row>
          <Col xs={12}><h4>Пожалуйста, заполните свои контактные данные</h4></Col>
          <Col xs={12} md={6}>
          <FieldGroup
            id="personName"
            type="text"
            label="Ваше имя"
            placeholder="ФИО"
          />
          </Col>
          <Col xs={12} md={6}>
          <FieldGroup
            id="email"
            type="email"
            label="Электронная почта"
          />
          </Col>
          <Col xs={12} md={6}>
          <FieldGroup
            id="phone"
            type="text"
            label="Телефон"
          />
          </Col>
          <Col xs={12} md={6}>
          <FieldGroup
            id="age"
            type="number"
            label="Возраст"
          />
          </Col>
          <Col xs={12}>
            <Button>Далее</Button>
          </Col>
    </Row>);
    }
}
export default connect()(StartPageClass);
