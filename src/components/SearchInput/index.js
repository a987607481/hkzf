import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom"
import './index.css'
class index extends Component {
    render() {
        return (
            <Fragment>
                <div className='search_input'>
                    <div className='search_input_content' onClick={(params) => {
                        this.props.history.push("/citylist")
                    }}>
                        <div className="search_input_city">
                            <span>上海</span>
                            <i className="iconfont icon-arrow"></i>
                        </div>
                        <div className="search_input_inp">
                            <i className="iconfont icon-seach"></i>
                            <span>請輸入小區或者地址</span>
                        </div>
                    </div>
                    <div className='search_input_map' onClick={(params) => {
                        this.props.history.push("/bmap")
                    }}>
                        <i className="iconfont icon-map"></i>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default withRouter(index)
