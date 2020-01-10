import React, { Component, Fragment } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "../../utils/request"
import SearchInput from "../../components/SearchInput"
import { API_URL } from '../../utils/urls';
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import './index.css'
class index extends Component {
  state = {
    house_list: []
  }
  count = 0 //存储列表有多少条数据的
  pageSize = 20
  Qparam = {
      start:1,
      end:20
  }
  loading = false
  componentDidMount() {
    console.log(this.props.cityName);
    this.getList();
  }
  getList = async (params) => {
    //1. 发请求获取我们城市的 value
    let cityId = (await axios.get("/area/info?name=" + this.props.cityName)).body.value;
    console.log(cityId);
    let res = (await axios.get("/houses",{
      params:this.Qparam
    })).body;
    this.count = res.count;
    this.loading = false
    this.setState({
      house_list: [...this.state.house_list,...res.list]
    })
    console.log(res);
  }

  // 渲染列表 
  rowRenderer = ({ key, index, style }) => {
    let v = this.state.house_list[index];
    return <div key={key} className="map_house_list_item" style={style}>
      <div className="img_wrapper">
        <img alt="" src={API_URL + v.houseImg}></img>
      </div>
      <div className="map_house_list_text">
        <div className="houseInfo1">{v.title}</div>
        <div className="houseInfo2">{v.desc}</div>
        <div className="houseInfo3">{v.tags.map((v, index) => <span key={index}>{v}</span>)}</div>
        <div className="houseInfo4"><span>{v.price}</span>元/月</div>
      </div>
    </div>
  }

  handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    // console.log("clientHeight:"+clientHeight);  // 列表组件的外层高度
    // console.log("scrollHeight:"+scrollHeight); // 列表的长度
    // console.log("scrollTop:"+scrollTop); // 列表滚动的高度
    if ((scrollHeight - clientHeight - scrollTop) < 20) { //是否触底
      if (this.Qparam.end < this.count && !this.loading) {
        this.Qparam.start += this.pageSize;
        this.Qparam.end += this.pageSize;
        this.loading = true;
        this.getList();
      }
    }
  }

  render() {
    return (
      <Fragment>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          style={{
            backgroundColor: "#f6f5f6"
          }}
          onLeftClick={() => this.props.history.push("/")}
        ></NavBar>
        <div className="list_header_searchInput">
          <SearchInput />
        </div>
        <div className="list_content">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                rowCount={this.state.house_list.length}
                rowHeight={120}
                rowRenderer={this.rowRenderer}
                width={width}
                onScroll={this.handleScroll}
              />
            )}
          </AutoSizer>
        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cityName: state.cityName
  }
}
export default connect(mapStateToProps, null)(withRouter(index))
