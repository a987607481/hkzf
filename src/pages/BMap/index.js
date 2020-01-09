import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon } from 'antd-mobile';
import axios from "../../utils/request"
import './index.css'
import { API_URL } from '../../utils/urls';
let BMap = window.BMap


class Index extends Component {

  state = {
    house_list: [], //房源信息接口
    show: false
  }
  Sites = [
    { level: 1, zoom: 11, shape: "circle", name: "城市" },
    { level: 2, zoom: 14, shape: "circle", name: "区域" },
    { level: 3, zoom: 16, shape: "rect", name: "街道" },
  ]
  index = 0
  componentDidMount() {
    this.init_map()
  }

  init_map = async (params) => {
    this.map = new BMap.Map("allmap")
    this.map.centerAndZoom(this.props.cityName, this.Sites[this.index].zoom);//输入当前显示城市和比例
    this.map.addControl(new BMap.NavigationControl());  //缩放
    this.map.addControl(new BMap.ScaleControl());     //比例尺
    let cityObj = (await axios.get("/area/info?name=" + this.props.cityName)).body
    this.drawHouse(cityObj)
    //拖动触发
    this.map.addEventListener('dragstart', (params) => {
      this.setState({
        show: false
      })
    })
  }

  drawHouse = async (cityObj) => {
    let res = (await axios.get("/area/map?id=" + cityObj.value)).body
    this.map.clearOverlays(); //清除障碍物
    if (this.index !== 0 && this.index < 3) {
      this.map.centerAndZoom(new BMap.Point(cityObj.coord.longitude, cityObj.coord.latitude), this.Sites[this.index].zoom)
    }
    res.map(v => {
      let point = new BMap.Point(v.coord.longitude, v.coord.latitude);
      let label = "";
      if (this.Sites[this.index].shape === "circle") {
        label = new BMap.Label("<div class='circle'>" + v.label + "<br/>" + v.count + "套</div>", {
          offset: new BMap.Size(0, 0),      //label的偏移量，为了让label的中心显示在点上
          position: point
        })
      } else {
        label = new BMap.Label("<div class='rect'>" + v.label + "<br/>" + v.count + "套</div>",     //为label填写内容
          {
            offset: new BMap.Size(0, 0),
            position: point
          });
      }
      label.setStyle({
        backgroundColor: "tranparent",
        border: "none"
      })
      label.addEventListener("click", (params) => {
        if (this.index === 3) {
          this.getHouseList(v)
          this.setState({
            show: true
          })
        } else {
          this.drawHouse(v);
        }
      });
      this.map.addOverlay(label);
    })
    this.index++;
  }
  getHouseList = async (v) => {
    let house_list = (await axios.get("/houses?cityId=" + v.value)).body.list;
    console.log(house_list);
    this.setState({
      house_list
    })
  }
  renderHouseList = (params) => {
    return <div className='map_house_list_bottom'>
      <div className='map_house_list_header'>
        <span>房屋列表</span>
        <span>更多房源</span>
      </div>
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
      <div>
        <NavBar
          style={{ backgroundColor: '#f6f5f6' }}
          mode='light'
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >地图找房
        </NavBar>
        <div className="bMap_content">
          <div id="allmap"></div>
          <div className={this.state.show ? "map_house_list h40" : "map_house_list"}>
            {
              this.renderHouseList()
            }
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cityName: state.cityName
  }
}
export default connect(mapStateToProps, null)(withRouter(Index))