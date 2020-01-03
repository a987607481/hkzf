import React, { Component,Fragment } from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './pages/home'
import Info from './pages/info'
import List from './pages/list'
import Profile from './pages/profile'
import HKLayout from "./components/HKLaout"

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route path='/' exact render={(props)=><HKLayout><Home {...props}></Home></HKLayout>}></Route>
          <Route path='/info' exact render={(props)=><HKLayout> <Info {...props}></Info></HKLayout>}></Route>
          <Route path='/list' exact render={(props)=><HKLayout><List {...props}></List></HKLayout>}></Route>
          <Route path='/profile' exact render={(props)=><HKLayout><Profile {...props}></Profile></HKLayout>}></Route>
        </Router>
      </Fragment>
    )
  }
}
