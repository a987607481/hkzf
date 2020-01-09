import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import Info from './pages/info'
import List from './pages/list'
import Profile from './pages/profile'
import HKLayout from "./components/HKLaout"
import CityList from "./pages/CityList"
import BMap from "./pages/BMap"
import store from "./store"
import { setCityNameAction } from "./store/actionCreator"

export default class App extends Component {

  componentDidMount() {
    // var myCity = new window.BMap.LocalCity();
    // myCity.get((result) => {
    //   let  cityName = this.props.cityName || result.name;
    //   store.dispatch(setCityNameAction(cityName));
    // });

  }

  render() {
    return (
      <Fragment>
        <Router>
          <Route path='/' exact render={(props) => <HKLayout><Home {...props}></Home></HKLayout>}></Route>
          <Route path='/info' exact render={(props) => <HKLayout> <Info {...props}></Info></HKLayout>}></Route>
          <Route path='/list' exact render={(props) => <HKLayout><List {...props}></List></HKLayout>}></Route>
          <Route path='/profile' exact render={(props) => <HKLayout><Profile {...props}></Profile></HKLayout>}></Route>
          <Route path="/citylist" exact render={() => <CityList />} />
          <Route path="/bmap" exact render={() => <BMap />} />
        </Router>
      </Fragment>
    )
  }
}
