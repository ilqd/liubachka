import React from 'react';
import {Navbar, Nav,  NavItem, Glyphicon, NavDropdown, MenuItem} from 'react-bootstrap';
import {IndexLinkContainer} from 'react-router-bootstrap';
import logo from '../res/logo.png';
import { connect } from 'react-redux';
import {logout} from '@/store/useraccount.store';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.logout();
    }
    render() {
        return (
      <Navbar fixedTop style={{width: '100vw', maxWidth: '100%'}}>
        <Navbar className="title-bar row">
          <Navbar.Brand style={{ display: 'flex', paddingRight: 1}}>
            <img src={logo} style={{height: '2em'}}/>
            <div className="brand-text">SPLASH<br/>COURSE</div>
          </Navbar.Brand>
          <Navbar.Brand pullRight className="pull-right" style={{margin: 0, paddingLeft: 1, marginLeft: 'auto'}}>
            <div>Наши телефоны</div>
            <div>﻿+7 919 775 97 63</div>
          </Navbar.Brand>
        </Navbar>
        <Nav className="second-navbar">
        <Navbar.Toggle />
        <Navbar.Collapse>
        <Nav bsStyle="tabs" justified>
          <IndexLinkContainer to="/"><NavItem eventKey="1" >Главная</NavItem></IndexLinkContainer>
          <NavItem eventKey="2" >Программы и цены</NavItem>
          <NavItem eventKey="3" >Семинары</NavItem>
          <NavItem eventKey="4" >Разговорный клуб</NavItem>
          <NavItem eventKey="5" >Контакты</NavItem>
          {this.props.roles && this.props.roles.includes('ROLE_ADMIN') ?
          <NavDropdown eventKey="6" title="Админка" id="nav-dropdown">
            <IndexLinkContainer to="/admin/testList"><NavItem eventKey="6.1">Настройка тестов</NavItem></IndexLinkContainer>
            <MenuItem eventKey="6.2">Результаты тестов</MenuItem>
          </NavDropdown>
          : ''}
          {this.props.userId === undefined ?
          <IndexLinkContainer to="/login">
            <NavItem eventKey="7" ><Glyphicon glyph="log-in"/></NavItem>
          </IndexLinkContainer> :
          <NavItem eventKey="8" onClick={this.logout}><Glyphicon glyph="log-out"/></NavItem>
          }
        </Nav>
        </Navbar.Collapse>
        </Nav>
      </Navbar>
    );
    }
}
Header.propTypes = {
    userId: React.PropTypes.string,
    logout: React.PropTypes.func,
    roles: React.PropTypes.string,
};
export default connect(state=>({
    firstName: state.getIn(['session', 'firstName']),
    lastName: state.getIn(['session', 'lastName']),
    userId: state.getIn(['session', 'userId']),
    roles: state.getIn(['session', 'roles']),
}), dispatch=>({
    logout() {
        logout(dispatch);
    }
}))(Header);
