import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/Main.jsx';
import Skilltest from './components/skilltest/Skilltest.jsx';
import CreateTest from './components/admin/CreateTest.jsx';
import AdminTestSelector from './components/admin/AdminTestSelector.jsx';
import LoginPage from './components/useraccount/Login.jsx';

export default (
	<Switch>
		<Route exact path="/" component={Main} />
		<Route exact path="/login" component={LoginPage} />
		<Route exact path="/skilltest/:testType?" component={Skilltest} />
		<Route exact path="/admin/createTest" component={CreateTest} />
		<Route exact path="/admin/testList" component={AdminTestSelector} />
		<Route path="/admin/editTest/:editTestName?" component={CreateTest} />
		<Route exact path="/loginRedirect" component={Main} />
	</Switch>
);
