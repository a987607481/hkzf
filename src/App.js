import React, { Component,Fragment } from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './pages/home'
import Info from './pages/info'
import List from './pages/list'
import Profile from './pages/profile'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route path='/' exact render={(props)=><Home {...props}></Home>}></Route>
          <Route path='/info' exact render={(props)=><Info {...props}></Info>}></Route>
          <Route path='/list' exact render={(props)=><List {...props}></List>}></Route>
          <Route path='/profile' exact render={(props)=><Profile {...props}></Profile>}></Route>
          
        </Router>
      </Fragment>
    )
  }
}
