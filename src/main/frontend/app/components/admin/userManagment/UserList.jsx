import React from 'react';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import {loadUsers} from '@/store/adminUsersList.store.js';
import {List} from 'immutable';
import {Glyphicon} from 'react-bootstrap';
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
        <Glyphicon glyph="pencil"/>
      </LinkContainer>);
    }
    render() {
        return (<div>
        <BootstrapTable pagination data={this.props.users.toJS()} keyField="id">
        <TableHeaderColumn width="33%" headerAlign="center"filter={{ type: 'TextFilter', delay: 250 }} dataField="fullname" dataSort>Имя</TableHeaderColumn>
        <TableHeaderColumn width="22%" headerAlign="center" filter={{ type: 'TextFilter', delay: 250 }} dataField="email" dataSort>Почта</TableHeaderColumn>
        <TableHeaderColumn width="100px" dataAlign="center" headerAlign="center"
              filter={checkboxFilter} dataFormat={this.checkbox} dataField="enabled" dataSort>Активен</TableHeaderColumn>
        <TableHeaderColumn width="40px" dataAlign="center" headerAlign="center" dataFormat={this.editUserFormatter}/>
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
