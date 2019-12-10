import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore, { history } from './redux/store'
import { ConnectedRouter } from 'connected-react-router'
import jwt from 'jsonwebtoken'

import './assets/css/base.less'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import NotFoundPage from './pages/NonFound'
import Dashboard from './pages/admin/Dashboard'

const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router history={history}>
            <BrowserRouter>
              <Navbar />
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/contact' component={ContactPage} />
                <Route path='/login' component={LoginPage}/>
                <Route path='/register' component={RegisterPage}/>
                <Route path='/user/dashboard' component={Dashboard}/>
                <Route path='*' component={NotFoundPage}/>
              </Switch>
            </BrowserRouter>
          </Router>
        </ConnectedRouter>
      </Provider>
    )
  }
}
