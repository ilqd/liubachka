import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/Main.jsx';
import Skilltest from './components/skilltest/Skilltest.jsx';
import CreateTest from './components/admin/CreateTest.jsx';

export default (
	<Switch>
		<Route exact path="/" component={Main} />
		<Route exact path="/skilltest" component={Skilltest} />
		<Route exact path="/admin/createTest" component={CreateTest} />
	</Switch>
);
