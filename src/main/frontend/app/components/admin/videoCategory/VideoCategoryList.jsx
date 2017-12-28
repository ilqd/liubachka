import React from 'react';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import {loadData} from '@/store/adminVideoCategoryList.store.js';
import {List} from 'immutable';
import {Button, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class VideoCategoryListClass extends React.Component {
    constructor(props) {
        super(props);
        this.editCategoryFormatter = this.editCategoryFormatter.bind(this);
        this.checkbox = this.checkbox.bind(this);
    }
    componentWillMount() {
        this.props.loadData();
    }
    checkbox(cell) {
        return <input type="checkbox" checked={ cell }/>;
    }
    editCategoryFormatter(cell, row) {
        return (
      <LinkContainer to={`/admin/editVideoCategory/${row.id}`}>
        <Button bsStyle="link" className="video-category-edit-button" style={{ padding: 0}}>
          <Glyphicon glyph="pencil"/>
        </Button>
      </LinkContainer>);
    }
    render() {
        return (<div>
        <BootstrapTable pagination data={this.props.data.toJS()} keyField="id" className="video-category-table">
        <TableHeaderColumn headerAlign="center"filter={{ type: 'TextFilter', delay: 250 }} dataField="name" dataSort>Название</TableHeaderColumn>
        <TableHeaderColumn width="40px" dataAlign="center" headerAlign="center" dataFormat={this.editCategoryFormatter}>
          <LinkContainer to={'/admin/editVideoCategory/'}>
            <Button bsStyle="link" className="video-category-edit-button">
              <Glyphicon glyph="plus"/>
            </Button>
          </LinkContainer>
        </TableHeaderColumn>
        </BootstrapTable>
    </div>);
    }
}

VideoCategoryListClass.propTypes = {
    data: React.PropTypes.object,
    loadData: React.PropTypes.func,
};

export default connect(state=>({
    data: state.getIn(['admin', 'videoCategory', 'list'], new List()),
}), dispatch =>({
    loadData() {
        loadData(dispatch);
    }
}))(VideoCategoryListClass);
