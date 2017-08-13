import React from 'react';
import { connect } from 'react-redux';
import {List} from 'immutable';
import {loadTests} from '@/store/skilltestList.store';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
class AdminTestSelectorClass extends React.Component {
    constructor(props) {
        super(props);
        this.loadTests = this.loadTests.bind(this);
    }
    componentWillMount() {
        this.loadTests();
    }
    loadTests() {
        this.props.loadTests();
    }
    render() {
        return(<div className="test-list">
        {this.props.testList.map((t, idx)=>
          <Row key={idx}>
            <Col xs={12}>
              {idx + 1}. {t} <LinkContainer to={`/admin/editTest/${t}`}>
                <Button bsStyle="link"><Glyphicon glyph="pencil"/></Button>
              </LinkContainer >
            </Col>
          </Row>)}
          <Row>
          <Col xs={12}>
            <LinkContainer to="/admin/createTest">
              <Button>
              Создать новый тест
              </Button>
            </LinkContainer >
          </Col>
          </Row>
        </div>
    );
    }
}
AdminTestSelectorClass.propTypes = {
    loadTests: React.PropTypes.func,
    testList: React.PropTypes.object,
};
export default connect((state)=>({
    testList: state.getIn(['skilltest', 'list'], new List()),
    busy: state.getIn(['ajaxStatus', 'posting']),
    netMessage: state.getIn(['ajaxStatus', 'message']),
}),
dispatch=>({
    loadTests() {
        loadTests(dispatch);
    }
}))(AdminTestSelectorClass);
