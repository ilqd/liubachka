import React from 'react';
import { Col, Row} from 'react-bootstrap';
import CarouselClass from './Carousel.jsx';
import Blocks from './Blocks.jsx';
import {logout} from '@/store/useraccount.store';
import {connect} from 'react-redux';
class Main extends React.Component {
    componentWillMount() {
        if (this.props.match && this.props.match.path == '/loginRedirect') {
            this.props.logout();
            if (this.props.history && this.props.history.replace) {
                this.props.history.replace('/');
            }
        }
    }
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
Main.propTypes = {
    logout: React.PropTypes.func,
    match: React.PropTypes.object,
    history: React.PropTypes.object,
};
export default connect(()=>({}), dispatch=>({
    logout() {
        logout(dispatch);
    }
}))(Main);
