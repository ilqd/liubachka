import React from 'react';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import {loadData, deleteItem} from '@/store/adminStudentGroupList.store.js';
import {List} from 'immutable';
import {Button, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class StudentGroupsListClass extends React.Component {
    constructor(props) {
        super(props);
        this.editCategoryFormatter = this.editCategoryFormatter.bind(this);
        this.deleteCategoryFormatter = this.deleteCategoryFormatter.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
    }
    componentWillMount() {
        this.props.loadData();
    }
    deleteGroup(id) {
        this.props.deleteItem(id);
    }
    checkbox(cell) {
        return <input type="checkbox" checked={ cell }/>;
    }
    editCategoryFormatter(cell, row) {
        return (
      <LinkContainer to={`/admin/editStudentGroups/${row.id}`}>
        <Button bsStyle="link" className="common-table-edit-button" style={{ padding: 0}}>
          <Glyphicon glyph="pencil"/>
        </Button>
      </LinkContainer>);
    }
    deleteCategoryFormatter(cell, row) {
        return (
        <Button onClick={this.deleteGroup.bind(this, row.id)} bsStyle="link" className="common-table-edit-button" style={{ padding: 0}}>
          <Glyphicon glyph="trash"/>
        </Button>);
    }
    render() {
        return (<div>
        <BootstrapTable pagination data={this.props.data.toJS()} keyField="id" className="common-table">
        <TableHeaderColumn headerAlign="center"filter={{ type: 'TextFilter', delay: 250 }} dataField="name" dataSort>Имя группы</TableHeaderColumn>
        <TableHeaderColumn width="40px" dataAlign="center" headerAlign="center" dataFormat={this.editCategoryFormatter}>
          <LinkContainer to={'/admin/editStudentGroups/'}>
            <Button bsStyle="link" className="common-table-edit-button">
              <Glyphicon glyph="plus"/>
            </Button>
          </LinkContainer>
        </TableHeaderColumn>
        <TableHeaderColumn width="40px" dataAlign="center" headerAlign="center" dataFormat={this.deleteCategoryFormatter}/>
        </BootstrapTable>
    </div>);
    }
}

StudentGroupsListClass.propTypes = {
    data: React.PropTypes.object,
    loadData: React.PropTypes.func,
    deleteItem: React.PropTypes.func,
};

export default connect(state=>({
    data: state.getIn(['admin', 'studentGroups', 'list'], new List()),
    users: state.getIn(['admin', 'users', 'list'], new List()),
}), dispatch =>({
    loadData() {
        loadData(dispatch);
    },
    deleteItem(id) {
        deleteItem(dispatch, id);
    }
}))(StudentGroupsListClass);
