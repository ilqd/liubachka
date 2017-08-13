import React from 'react';
import { connect } from 'react-redux';
import {RestAPI} from '@/net.js';
import {Button} from 'react-bootstrap';
import {data} from '../skilltest/DataStub.js';
class CreateTestClass extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit() {
        RestAPI.post('/api/tests/create', data);
    }
    render() {
        return (
      <div>
      <Button onClick={this.submit}>
      Create test
      </Button>
      </div>
    );
    }
}
export default connect(()=>({}))(CreateTestClass);
