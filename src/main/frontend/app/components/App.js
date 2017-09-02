import React from 'react';
import Routes from '../routes';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loadPages} from '../store/pageList.store';
import {List} from 'immutable';
class App extends React.Component {
    componentWillMount() {
        this.props.loadPages();
    }

    render() {
        return(
          <div>
              <Grid>
                  <Header/>
                  <div style={{marginTop: 117, padding: 0}}>
                  { Routes }
                  </div>
              </Grid>
              <Footer/>
          </div>
        );}
}
App.propTypes = {
    loadPages: React.PropTypes.func,
};
export default connect(state=>({
    pages: state.get('pages', new List())
}), dispatch=>({
    loadPages() {
        loadPages(dispatch);
    }
}))(App);
