import React from 'react';
import {connect} from 'react-redux';
import {loadResults, inspectResult, stopInspection} from '@/store/adminTestResults.store.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import {Row, Col, Glyphicon, Button} from 'react-bootstrap';
import {List} from 'immutable';
import ResultView from './ResultView';
import{ checkboxFilter} from '@/components/Util';
class ResultList extends React.Component {
    constructor(props) {
        super(props);
        this.resultFormatter = this.resultFormatter.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.showResults = this.showResults.bind(this);
        this.stopInspection = this.stopInspection.bind(this);
        this.options = {
            defaultSortName: 'id',  // default sort column name
            defaultSortOrder: 'desc',  // default sort order
            sizePerPage: 50,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Вперёд', // Previous page button text
            nextPage: 'Назад', // Next page button text
            firstPage: 'Первая', // First page button text
            lastPage: 'Последняя', // Last page button text
            paginationShowsTotal: true,  // Accept bool or function
            withFirstAndLast: true
        };
    }
    componentWillMount() {
        this.props.loadResults();
    }
    stopInspection() {
        this.props.stopInspection();
    }
    showResults(row) {
        this.props.inspectResult(row);
    }
    resultFormatter(cell, row) {
        if (!row.testSnapShotDto) {
            return <span>Тест не пройден!</span>;
        }
        return (<span clasName="test-result-info">
        {`Тест ${row.testName};`}Ответы: {row.correctAnswers}/{row.totalQuestions}; Баллы: {row.pointsEarned}/{row.totalPoints}
        <Button bsStyle="link" style={{padding: '0 0 0 5px'}} onClick={()=>this.showResults(row)}>
          <Glyphicon glyph="folder-open" title="Че как, норм или так. Шарит как бог или упорот как лох. Смотреть ответы - бесплатно, без регистрации и смс!"/>
        </Button>
        </span>);
    }
    checkbox(cell) {
        return <input type="checkbox" checked={ cell }/>;
    }

    render() {
        const options = {...this.options, ...{
            sizePerPageList: [ {text: '25', value: 25 }, {text: '50', value: 50},
             {text: '100', value: 100}, {text: 'Все', value: this.props.results.size} ]}};
        return (<Row>
          <Col xs={12}>
            {this.props.resultInspected ?
            <ResultView data={this.props.resultInspected} back={this.props.stopInspection}/> :
            <BootstrapTable pagination options={ options } multiColumnSort={2} data={this.props.results.toJS()}>
             <TableHeaderColumn dataField="id" width="40" isKey dataSort>№</TableHeaderColumn>
             <TableHeaderColumn filter={{ type: 'TextFilter', delay: 250 }}dataField="personName" dataSort>Имя</TableHeaderColumn>
             <TableHeaderColumn filter={{ type: 'TextFilter', delay: 250 }}dataField="phone">Телефон</TableHeaderColumn>
             <TableHeaderColumn filter={{ type: 'TextFilter', delay: 250 }}dataField="email">Почта</TableHeaderColumn>
             <TableHeaderColumn dataField="age" width="80px"dataSort>Возраст</TableHeaderColumn>
             <TableHeaderColumn filter={checkboxFilter} dataFormat={this.checkbox} dataField="interested" dataSort>Хочет учиться!</TableHeaderColumn>
             <TableHeaderColumn filter={checkboxFilter} dataFormat={this.checkbox} dataField="hasBeenCalled" dataSort>С ним/ней связались</TableHeaderColumn>
             <TableHeaderColumn filter={checkboxFilter} dataFormat={this.checkbox} dataField="willCome"  dataSort>Ура! Придёт!</TableHeaderColumn>
             <TableHeaderColumn dataFormat={this.resultFormatter}>Результаты</TableHeaderColumn>
            </BootstrapTable>
          }
          </Col>
        </Row>);
    }
}
ResultList.propTypes = {
    loadResults: React.PropTypes.func,
    inspectResult: React.PropTypes.func,
    results: React.PropTypes.object,
    resultInspected: React.PropTypes.object,
    stopInspection: React.PropTypes.func,
};
export default connect(state=>({
    results: state.getIn(['admin', 'testResults', 'list'], new List()),
    resultInspected: state.getIn(['admin', 'testResults', 'inspect'])
}), dispatch=>({
    loadResults() {
        loadResults(dispatch);
    },
    inspectResult(data) {
        inspectResult(dispatch, data);
    },
    stopInspection() {
        stopInspection(dispatch);
    }
}))(ResultList);
