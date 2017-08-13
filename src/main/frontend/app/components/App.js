import React from 'react';
import Routes from '../routes';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {Grid} from 'react-bootstrap';

const App = () =>
<div>
    <Grid>
        <Header/>
        <div style={{marginTop: 117, padding: 0}}>
        { Routes }
        </div>
    </Grid>
    <Footer/>
</div>;

export default App;
