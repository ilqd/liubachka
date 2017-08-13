import React from 'react';
import {Navbar, Nav,  NavItem} from 'react-bootstrap';
import {IndexLinkContainer} from 'react-router-bootstrap';
import logo from '../res/logo.png';
export default class Header extends React.Component {
    render() {
        return (
      <Navbar fixedTop style={{width: '100vw', maxWidth: '100%'}}>
        <Navbar className="title-bar row">
          <Navbar.Brand style={{ display: 'flex', paddingRight: 1}}>
            <img src={logo} style={{height: '2em'}}/>
            <div className="brand-text">SPLASH<br/>COURSE</div>
          </Navbar.Brand>
          <Navbar.Brand pullRight className="pull-right" style={{margin: 0, paddingLeft: 1}}>
            <div>Наши телефоны</div>
            <div>﻿+7 919 775 97 63</div>
          </Navbar.Brand>
        </Navbar>
        <Nav className="second-navbar">
        <Navbar.Toggle />
        <Navbar.Collapse>
        <Nav bsStyle="tabs" justified activeKey={1}>
          <IndexLinkContainer to="/"><NavItem eventKey={1} >Главная</NavItem></IndexLinkContainer>
          <NavItem eventKey={2} >Программы и цены</NavItem>
          <NavItem eventKey={3} >Семинары</NavItem>
          <NavItem eventKey={4} >Разговорный клуб</NavItem>
          <NavItem eventKey={5} >Контакты</NavItem>
        </Nav>
        </Navbar.Collapse>
        </Nav>
      </Navbar>
    );
    }
}
