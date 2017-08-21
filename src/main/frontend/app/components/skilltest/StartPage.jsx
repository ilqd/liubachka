import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Button, } from 'react-bootstrap';
import {FieldGroup} from '../Util.js';
import {startTest, changeExamineeInfo} from '@/store/skilltestResults.store';

import {Map} from 'immutable';
class StartPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAgeChange = this.onFieldChange.bind(this, 'age');
        this.state = {emailValidation: 'error', nameValidation: 'error'};
    }
    submit() {
        if (this.state.emailValidation == 'success' && this.state.nameValidation == 'success') {
            this.props.startTest(this.props.data.toJS());
        }
    }
    onNameChange(e) {
        const length = e.target.value ? e.target.value.length : 0;
        this.setState({nameValidation: length >= 2 ? 'success' : 'error'});
        this.onFieldChange('personName', e);
    }
    onEmailChange(e) {
        const email = e.target.value || '';
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({emailValidation: re.test(email) ? 'success' : 'error'});
        this.onFieldChange('email', e);
    }

    onFieldChange(field, e) {
        this.props.changeExamineeInfo(field, e.target.value);
    }

    render() {
        const canSubmit = this.state.emailValidation == 'success' && this.state.nameValidation == 'success';
        return (<div>
            <Row>
              <Col xs={12}><h4>Пожалуйста, заполните свои контактные данные</h4></Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <FieldGroup
                  onChange={this.onNameChange}
                  value={this.props.data.get('personName') || ''}
                  validationState={this.state.nameValidation}
                  id="personName"
                  type="text"
                  label="Ваше имя"
                  placeholder="ФИО"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <FieldGroup
                  onChange={this.onEmailChange}
                  validationState={this.state.emailValidation}
                  value={this.props.data.get('email') || ''}
                  id="email"
                  type="email"
                  label="Электронная почта"
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={3}>
                <FieldGroup
                  onChange={this.onAgeChange}
                  value={this.props.data.get('age') || 18}
                  min={5}
                  max={200}
                  id="age"
                  type="number"
                  label="Возраст"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button disabled={this.props.busy || !canSubmit} onClick={this.submit}>Далее</Button>
              </Col>
            </Row>
  </div>);
    }
}
StartPageClass.propTypes = {
    startTest: React.PropTypes.func,
    changeExamineeInfo: React.PropTypes.func,
    data: React.PropTypes.object,
    busy: React.PropTypes.bool,
};
export default connect((state)=>({
    busy: state.getIn(['ajaxStatus', 'posting']),
    data: state.getIn(['skilltest', 'attempt',  'data'], new Map()),
}),
dispatch=>({
    startTest(data) {
        startTest(dispatch, data);
    },
    changeExamineeInfo(field, value) {
        changeExamineeInfo(dispatch, field, value);
    }
}))(StartPageClass);
