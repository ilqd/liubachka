import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import Main from '../main/Main';
import {PageElement} from './PageElement';
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
        if (props.pages.size > 0) {
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
    }
    render() {
        if (this.state.pageFound === undefined) {
            return <div>Загрузка...</div>;
        }
        if (this.state.pageFound) {
            return <div>{this.page.get('children', new List()).map((elem, idx)=><PageElement key={idx} data={elem}/>)}</div>;
        } return <Main/>;
    }
}
Page.propTypes = {
    pages: React.PropTypes.object,
    match: React.PropTypes.object,
};
export default connect(state=>({
    pages: state.get('pages', new List())
}))(Page);
