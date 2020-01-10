import React, { Component, Fragment } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "../../utils/request"
import SearchInput from "../../components/SearchInput"
import { API_URL } from '../../utils/urls';
import './index.css'
class index extends Component {
  state = {
    house_list: []
  }
  count = 0 //存储列表有多少条数据的
  componentDidMount() {
    console.log(this.props.cityName);
    this.getList();
  }
  getList = async (params) => {
    //1. 发请求获取我们城市的 value
    let cityId = (await axios.get("/area/info?name=" + this.props.cityName)).body.value;
    console.log(cityId);
    let res = (await axios.get("/houses?cityId=" + cityId)).body;
    this.count = res.count;
    this.setState({
      house_list: res.list
    })
    console.log(res);
  }

  // 渲染列表 
  renderHouseList = (params) => {
    return <div className='map_house_list_bottom'>
      <div className="map_house_list_content">
        {
          this.state.house_list.map((v, i) => <div key={i} className="map_house_list_item">
            <div className="img_wrapper">
              <img alt="" src={API_URL + v.houseImg}></img>
            </div>
            <div className="map_house_list_text">
              <div className="houseInfo1">{v.title}</div>
              <div className="houseInfo2">{v.desc}</div>
              <div className="houseInfo3">{v.tags.map((v, index) => <span key={index}>{v}</span>)}</div>
              <div className="houseInfo4"><span>{v.price}</span>元/月</div>
            </div>
          </div>)
        }
      </div>
    </div>
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
          {
            this.renderHouseList()
          }
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
