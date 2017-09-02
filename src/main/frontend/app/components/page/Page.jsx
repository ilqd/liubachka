import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        this.loadPage();
    }
    componentWillReceiveProps(props) {
        this.loadPage(props);
    }

    loadPage(props = this.props) {
        if (props.match && props.match.params && props.match.params.url) {
            const page = props.pages.find(p=>p.get('url') == props.match.params.url);
            if (page) {
                this.page = page;
                this.setState({pageFound: true});
                return;
            }
        }
        this.setState({pageFound: false});
    }
    render() {
        let result = 'Загрузка...';
        if (this.state.pageFound) {
            result = this.page.get('name');
        }else if (this.state.pageFound === false) {
            result = 'Ошибка при загрузке страницы.';
        }
        return <div>{result}</div>;
    }
}
Page.propTypes = {
    pages: React.PropTypes.object,
    match: React.PropTypes.object,
};
export default connect(state=>({
    pages: state.get('pages', new List())
}))(Page);
