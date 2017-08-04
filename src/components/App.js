import React, {Component} from 'react';
import {Link} from 'react-router';
import {fromJS}  from 'Immutable'
import pureRender from "pure-render-decorator";
import {Layout, Icon, Dropdown} from 'antd';
const {Header, Sider, Content} = Layout;
import axios from 'axios';

import AppHeader from './pages/common/AppHeader';
import UserMenu from './pages/common/UserMenu';
import TabPanes from './pages/common/TabPanes';
import LeftMenu from './pages/common/LeftMenu';


//@pureRender
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabActiveKey: 'home',
            panesItem   : {}
        };
    }


    componentDidMount() {
        this.createTabPane()
    }

    createTabPane() {
        const {tabKey = 'home', title = '首页'} = this.props.location.query

        this.setState({
            panesItem   : {
                title,
                content : <div>{this.props.children}</div>,
                key     : tabKey,
                closable: tabKey === 'home' ? false : true,
            },
            tabActiveKey: tabKey
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const {tabKey = 'home', title = '首页'} = nextProps.location.query
            this.setState({
                panesItem   : {
                    title,
                    content : <div>{nextProps.children}</div>,
                    key     : tabKey,
                    closable: tabKey === 'home' ? false : true,
                },
                tabActiveKey: tabKey
            })
        }

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    // shouldComponentUpdate(nextProps,nextState){
    //   if(this.state.tabActiveKey === nextState.tabActiveKey) return false;
    //   return true;
    // }

    render() {
        const {panesItem, tabActiveKey} = this.state

        return (
            <div className="yunpad-layout">
                <Layout>
                    <AppHeader />
                    <Layout>

                        <Sider
                            width={168}
                            style={{background: '#2f4050'}}
                            trigger={null}
                            collapsible
                            collapsed={this.state.collapsed}
                        >
                            <div className="toggle-menu">
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </div>
                            <div className="user-info">
                                <div className="user-photo">
                                    <Icon type="user"/>
                                </div>
                                <UserMenu />
                            </div>
                            <LeftMenu collapsed={this.state.collapsed}/>
                        </Sider>
                        <Layout>

                            <Content style={{background: '#fff', margin: 0, minHeight: 280}}>
                                <TabPanes defaultActiveKey={'home'} panesItem={panesItem} tabActiveKey={tabActiveKey}/>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

