import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import CardCreator from './CardCreator';
import CardFolderList from './CardFolderList';
import CardFolderEdit from './CardFolderEdit';

class CardList extends React.Component {
    render() {
        return (<div>
      <style dangerouslySetInnerHTML={{__html: `
      @media print {
          body * {
            visibility: hidden;
          }
          .all-card-blocks, .all-card-blocks * {
            visibility: visible;
          }
          .all-card-blocks {
            position: absolute;
            left: 0;
            top: 0;
          }
          .card-creator{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      `}}/>
    <Row>
    <Col xs={6} sm={5} md={3}>
      <CardFolderList />
    </Col>
    <Col xs={6} sm={7} md={9} className="card-creator">
      {this.props.cardEditStarted && <CardCreator />}
      {this.props.folderEditStarted && <CardFolderEdit />}
    </Col>
    </Row>
    </div>);
    }
}
CardList.propTypes = {
    cardEditStarted: React.PropTypes.bool,
    folderEditStarted: React.PropTypes.bool,
};
export default connect(state=>({
    folderEditStarted: state.getIn(['admin', 'cards', 'folderEdit', 'editMode'], false),
    cardEditStarted: state.getIn(['admin', 'cards', 'edit', 'editMode'], false),
}))(CardList);
