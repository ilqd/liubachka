import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/Main.jsx';
import Skilltest from './components/skilltest/Skilltest.jsx';
import CreateTest from './components/admin/CreateTest.jsx';
import AdminTestSelector from './components/admin/AdminTestSelector.jsx';
import ResultsList from './components/admin/ResultsList.jsx';
import PageList from './components/admin/pageCreator/PageList.jsx';
import LoginPage from './components/useraccount/Login.jsx';

export default (
	<Switch>
		<Route exact path="/login" component={LoginPage} />
		<Route exact path="/skilltest/:testType?" component={Skilltest} />
		<Route exact path="/admin/createTest" component={CreateTest} />
		<Route exact path="/admin/testList" component={AdminTestSelector} />
		<Route exact path="/admin/testResults" component={ResultsList} />
		<Route exact path="/admin/pageList" component={PageList} />
		<Route path="/admin/editTest/:editTestName?" component={CreateTest} />
		<Route exact path="/loginRedirect" component={Main} />,
		<Route path="/" component={Main} />
	</Switch>
);
