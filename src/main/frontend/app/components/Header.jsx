import React from 'react';
import {Navbar, Nav,  NavItem, Glyphicon, NavDropdown} from 'react-bootstrap';
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
        let userDropdown = undefined;
        const videoLink =  <IndexLinkContainer to="/video/list"><NavItem >Видео</NavItem></IndexLinkContainer>;
        if (this.props.roles && this.props.roles.includes('ROLE_ADMIN')) {
            userDropdown =  (
          <NavDropdown title={`${this.props.firstName || ''} ${this.props.lastName || ''}`} id="nav-dropdown">
            {videoLink}
            <IndexLinkContainer to="/admin/testList"><NavItem >Настройка тестов</NavItem></IndexLinkContainer>
            <IndexLinkContainer to="/admin/testResults"><NavItem >Результаты тестов</NavItem></IndexLinkContainer>
            <IndexLinkContainer to="/admin/pageList"><NavItem >Настройка страниц</NavItem></IndexLinkContainer>
            <IndexLinkContainer to="/admin/cardCreator"><NavItem >Карточки для activity</NavItem></IndexLinkContainer>
            <IndexLinkContainer to="/admin/userList"><NavItem >Пользователи</NavItem></IndexLinkContainer>
        </NavDropdown>);
        }else if (this.props.roles && !this.props.roles.includes('ROLE_ADMIN')) {
            userDropdown = (<NavDropdown title={`${this.props.firstName || ''} ${this.props.lastName || ''}`} id="nav-dropdown">
            {videoLink}
            </NavDropdown>);
        }
        return (
      <Navbar fixedTop style={{width: '100vw', maxWidth: '100%'}} collapseOnSelect >
        <Navbar className="title-bar row">
          <Navbar.Brand style={{ display: 'flex', paddingRight: 1}}>
            <img src={logo} style={{height: '2em'}}/>
            <div className="brand-text">SPLASH<br/>COURSE</div>
          </Navbar.Brand>
          <Navbar.Brand className="pull-right" style={{margin: 0, paddingLeft: 1, marginLeft: 'auto'}}>
            <div>Наши телефоны</div>
            <div>﻿+7 919 775 97 63</div>
          </Navbar.Brand>
        </Navbar>
        <Nav className="second-navbar">
        <Navbar.Toggle />
        <Navbar.Collapse>
        <Nav bsStyle="tabs" justified>
          <IndexLinkContainer to="/"><NavItem >Главная</NavItem></IndexLinkContainer>
          <NavItem >Программы и цены</NavItem>
          <NavItem >Семинары</NavItem>
          <NavItem >Разговорный клуб</NavItem>
          <NavItem >Контакты</NavItem>
          {userDropdown}
          {this.props.userId === undefined ?
          <IndexLinkContainer to="/login">
            <NavItem ><Glyphicon glyph="log-in"/></NavItem>
          </IndexLinkContainer> :
          <NavItem onClick={this.logout}><Glyphicon glyph="log-out"/></NavItem>
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
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string,
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
}), null, {pure: false})(Header);
