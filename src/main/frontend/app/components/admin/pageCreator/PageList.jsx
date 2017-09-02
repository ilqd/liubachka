import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {Row, Col, Glyphicon, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {loadPages } from '@/store/adminPageList.store';

class PageListClass extends React.Component {
    componentWillMount() {
        this.props.loadPages();
    }
    render() {
        return (<Row>
        <Col xs={12}>
          {this.props.pages.map((p, idx)=>
          <Row>
            <Col xs={12}> {`${idx}. Имя:${p.get('name')}; URL: ${p.get('url', '')}`}<Button bsStyle="link"><Glyphicon glyph="pencil"/></Button></Col>
          </Row>)}
        <Row>
          <Col xs={12}>
            <LinkContainer to="/admin/createPage"><Button>Создать страницу</Button></LinkContainer>
          </Col>
        </Row>
        </Col>
        </Row>);
    }
}
PageListClass.propTypes = {
    pages: React.PropTypes.object,
    loadPages: React.PropTypes.func,
};
export default connect(
  state=>({
      pages: state.getIn(['admin', 'pages', 'list'], new List())
  }),
  dispatch=>({
      loadPages() {
          loadPages(dispatch);
      }
  })
)(PageListClass);
