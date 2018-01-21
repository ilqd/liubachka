import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/Main.jsx';
import Skilltest from './components/skilltest/Skilltest.jsx';
import CreateTest from './components/admin/CreateTest.jsx';
import AdminTestSelector from './components/admin/AdminTestSelector.jsx';
import ResultsList from './components/admin/ResultsList.jsx';
import PageList from './components/admin/pageCreator/PageList.jsx';
import CreatePage from './components/admin/pageCreator/CreatePage.jsx';
import LoginPage from './components/useraccount/Login.jsx';
import Page from './components/page/Page';
import CardList from './components/admin/stuff/CardList';
import UserList from './components/admin/userManagment/UserList';
import UserEdit from './components/admin/userManagment/UserEdit';
import VideoUpload from './components/video/YoutubeUploadPage';
import VideoList from './components/video/VideoList';
import VideoCategoryList from './components/admin/videoCategory/VideoCategoryList';
import VideoCategoryEdit from './components/admin/videoCategory/VideoCategoryEdit';
import StudentGroupsList from './components/admin/scheduler/StudentGroupsList';
import StudentGroupsEdit from './components/admin/scheduler/StudentGroupsEdit';
import Scheduler from './components/admin/scheduler/Scheduler';
export default <Switch>
  <Route exact path="/login" component={LoginPage} />
  <Route exact path="/loginRedirect" component={Main} />
  <Route exact path="/skilltest/:testType?" component={Skilltest} />
  <Route exact path="/admin/createTest" component={CreateTest} />
  <Route exact path="/admin/testList" component={AdminTestSelector} />
  <Route exact path="/admin/testResults" component={ResultsList} />
  <Route exact path="/admin/pageList" component={PageList} />
  <Route exact path="/admin/createPage" component={CreatePage} />
  <Route exact path="/admin/cardCreator" component={CardList} />
  <Route exact path="/admin/userList" component={UserList} />
  <Route exact path="/video/upload" component={VideoUpload} />
  <Route exact path="/video/list" component={VideoList} />
  <Route exact path="/admin/videoCategoryList" component={VideoCategoryList} />
  <Route exact path="/admin/studentGroups" component={StudentGroupsList} />
  <Route exact path="/scheduler" component={Scheduler} />
  <Route path="/admin/userEdit/:editUserId?" component={UserEdit} />
  <Route path="/admin/editPage/:editPageId?" component={CreatePage} />
  <Route path="/admin/editTest/:editTestName?" component={CreateTest} />
  <Route path="/admin/editVideoCategory/:id?" component={VideoCategoryEdit} />
  <Route path="/admin/editStudentGroups/:id?" component={StudentGroupsEdit} />
  <Route path="/page/:url?" component={Page} />
  <Route path="/" component={Main} />
</Switch>;
