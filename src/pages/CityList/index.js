import React, { Component, Fragment } from 'react'
import axios from "../../utils/request"
import { NavBar, Icon } from 'antd-mobile';
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './index.css'

export default class Index extends Component {
  state = {
    all_cities: [],
    key_arrs: [],
    select_index: 0
  }
  componentDidMount() {
    this.getAllCities();
  }
  getAllCities = async (params) => {
    let hot_cities = (await axios.get('/area/hot')).body
    let all_cities = [
      { "当前城市": ["广州"] },
      { "热门城市": hot_cities.map(v => v.label) }
    ]
    let cityList = (await axios.get('/area/city?level=1')).body
    //按照字母进行排序
    cityList.sort(function (a, b) {
      return a.short.localeCompare(b.short)
    })
    cityList.map(v => {
      let firstLetter = v.short[0].toUpperCase();
      let index = all_cities.findIndex(vv => {
        if (vv[firstLetter]) {
          return true;
        }
      })
      if (index === -1) {
        all_cities.push({
          [firstLetter]: [v.label]
        })
      } else {
        all_cities[index][firstLetter].push(v.label)
      }
    })
    let key_arrs = all_cities.map(v => Object.keys(v)[0])
    key_arrs[0] = "#";
    key_arrs[1] = "热";
    this.setState({
      key_arrs, all_cities
    })
    console.log(all_cities)
  }
  getRowHeight({ index }) {
    let item = this.state.all_cities[index]
    return (Object.values(item)[0].length) * 50 + 40;
  }
  onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {
    this.setState({
      select_index: startIndex
    })
  }
  constructor(props) {
    super(props);
    this.MainList = React.createRef();
  }
  onLetterClick = (row) => {
    this.MainList.current.scrollToRow(row)
    this.setState({
      select_index: row
    })
  }
  //每一行的渲染的逻辑
  rowRenderer({
    index,
    isScrolling,
    isVisible,
    key,
    parent,
    style,
  }) {
    let item = this.state.all_cities[index]
    let key_name = Object.keys(item)[0]
    let list = Object.values(item)[0]
    return <div className="city_item" key={key} style={style}>
      <div className='city_title'>{key_name}</div>
      {
        list.map((v, i) =>
          <div key={i} className='city_label'>{v}</div>
        )
      }
    </div>
  }
  render() {
    return (
      <Fragment>
        <NavBar
          style={{ backgroundColor: '#f6f5f6' }}
          mode='light'
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >城市选择
                </NavBar>
        <div className="city_list">
          <AutoSizer>
            {
              ({ height, width }) => (
                <List
                  ref={this.MainList}
                  height={height}
                  rowCount={this.state.all_cities.length}
                  rowHeight={this.getRowHeight.bind(this)}
                  rowRenderer={this.rowRenderer.bind(this)}
                  width={width}
                  onRowsRendered={this.onRowsRendered}
                  scrollToAlignment="start"
                ></List>
              )
            }
          </AutoSizer>
          <div className='city_key_arrs'>
            {
              this.state.key_arrs.map((v, i) =>
                <div key={i} className={this.state.select_index === i ? 'city_key_item active' : 'city_key_item'}
                  onClick={this.onLetterClick.bind(this, i)}
                >{v}</div>
              )}
          </div>
        </div>
      </Fragment>
    )
  }
}
