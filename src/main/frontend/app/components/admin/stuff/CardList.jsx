import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import CardCreator from './CardCreator';
import CardFolders from './CardFolders';

class CardList extends React.Component {
    render() {
        return (<div>
    <Row>
    <Col xs={6} sm={5} md={3}>
      <CardFolders />
    </Col>
    <Col xs={6} sm={7} md={9}>
      <CardCreator />
    </Col>
    </Row>
    </div>);
    }
}
export default connect()(CardList);
