import React from 'react';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import {loadUsers} from '@/store/adminUsersList.store.js';
import {List} from 'immutable';
import {Button, Glyphicon} from 'react-bootstrap';
import{ checkboxFilter} from '@/components/Util';
import {LinkContainer} from 'react-router-bootstrap';

class UserListClass extends React.Component {
    constructor(props) {
        super(props);
        this.editUserFormatter = this.editUserFormatter.bind(this);
        this.checkbox = this.checkbox.bind(this);
    }
    componentWillMount() {
        this.props.loadUsers();
    }
    checkbox(cell) {
        return <input type="checkbox" checked={ cell }/>;
    }
    editUserFormatter(cell, row) {
        return (
      <LinkContainer to={`/admin/userEdit/${row.id}`}>
        <Button bsStyle="link" className="user-edit-button" style={{ padding: 0}}>
          <Glyphicon glyph="pencil"/>
        </Button>
      </LinkContainer>);
    }
    render() {
        return (<div>
        <BootstrapTable pagination data={this.props.users.toJS()} keyField="id">
        <TableHeaderColumn width="300px" headerAlign="center"filter={{ type: 'TextFilter', delay: 250 }} dataField="fullname" dataSort>Имя</TableHeaderColumn>
        <TableHeaderColumn width="150px" headerAlign="center"filter={{ type: 'TextFilter', delay: 250 }} dataField="username" dataSort>Логин</TableHeaderColumn>
        <TableHeaderColumn width="150px" headerAlign="center" filter={{ type: 'TextFilter', delay: 250 }} dataField="email" dataSort>Почта</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataAlign="center" headerAlign="center"
              filter={checkboxFilter} dataFormat={this.checkbox} dataField="enabled" dataSort>Активен</TableHeaderColumn>
        <TableHeaderColumn width="40px" dataAlign="center" headerAlign="center" dataFormat={this.editUserFormatter}>
          <LinkContainer to={'/admin/userEdit/'}>
            <Button bsStyle="link" className="user-edit-button">
              <Glyphicon glyph="plus"/>
            </Button>
          </LinkContainer>
        </TableHeaderColumn>
        </BootstrapTable>
    </div>);
    }
}

UserListClass.propTypes = {
    users: React.PropTypes.object,
    loadUsers: React.PropTypes.func,
};

export default connect(state=>({
    users: state.getIn(['admin', 'users', 'list'], new List()),
}), dispatch =>({
    loadUsers() {
        loadUsers(dispatch);
    }
}))(UserListClass);
