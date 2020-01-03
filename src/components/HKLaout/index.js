import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import { withRouter } from "react-router-dom"
import './index.css'

class HKLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
        };
    }
    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="red"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="首页"
                        key="Home"
                        icon={<i className="iconfont icon-ind"></i>
                        }
                        selectedIcon={<i className="iconfont icon-ind"></i>
                        }
                        selected={this.props.match.path === '/'}
                        onPress={() => {
                            this.props.history.push("/");
                        }}
                    >
                        {this.props.children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="iconfont icon-findHouse"></i>
                        }
                        selectedIcon={
                            <i className="iconfont icon-findHouse"></i>
                        }
                        title="找房"
                        key="findHouse"
                        selected={this.props.match.path === '/list'}
                        onPress={() => {
                            this.props.history.push('/list')
                        }}
                    >
                        {this.props.children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className="iconfont icon-infom"></i>
                        }
                        selectedIcon={
                            <i className="iconfont icon-infom"></i>
                        }
                        title="资讯"
                        key="info"
                        selected={this.props.match.path==='/info'}
                        onPress={() => {
                           this.props.history.push('/info')
                        }}
                    >
                        {this.props.children}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className="iconfont icon-myinfo"></i>}
                        selectedIcon={<i className="iconfont icon-myinfo"></i>}
                        title="我的"
                        key="my"
                        selected={this.props.match.path==='/profile'}
                        onPress={() => {
                           this.props.history.push('/profile')
                        }}
                    >
                        {this.props.children}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
export default withRouter(HKLayout)