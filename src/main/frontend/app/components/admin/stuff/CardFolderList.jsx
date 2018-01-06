import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Glyphicon} from 'react-bootstrap';
import CardFolder from './CardFolder';
import './cardcreator.css';
import {loadData} from '@/store/adminCardCreatorList.store.js';
import {List} from 'immutable';
import {updateField} from '@/store/adminCardFolderEdit.store.js';

class CardFolderList extends React.Component {
    componentWillMount() {
        this.props.loadData();
    }
    componentWillReceiveProps(props) {
        if (props.folderEditStarted != this.props.folderEditStarted ||
      props.cardEditStarted != this.props.cardEditStarted) {
            this.props.loadData();
        }
    }
    render() {
        return (
    <div>
      <Row>
        <Col xs={12}>
          {this.props.data.filter(e=>!e.get('hidden')).map(e=><CardFolder key={e.get('id')} elem={e}/>)}
          <div className="card-folder" onClick={this.props.startEdit}>
            <Glyphicon glyph="globe"/>Создать курс
          </div>
        </Col>
      </Row>
    </div>);
    }
}
CardFolderList.propTypes = {
    data: React.PropTypes.object,
    loadData: React.PropTypes.func,
    startEdit: React.PropTypes.func,
    cardEditStarted: React.PropTypes.bool,
    folderEditStarted: React.PropTypes.bool,
};
export default connect(state=>({
    data: state.getIn(['admin', 'cards', 'list'], new List()),
    folderEditStarted: state.getIn(['admin', 'cards', 'folderEdit', 'editMode'], false),
    cardEditStarted: state.getIn(['admin', 'cards', 'edit', 'editMode'], false),
}),
dispatch=>({
    loadData() {
        loadData(dispatch);
    },
    startEdit() {
        updateField(dispatch, 'editMode', true);
    }
}))(CardFolderList);
