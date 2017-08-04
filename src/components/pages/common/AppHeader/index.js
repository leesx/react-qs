/*
 * @Author: leesx 
 * @Date: 2017-07-06 11:02:34 
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-06 15:01:20
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon, Dropdown} from 'antd';
const { Header } = Layout;
import {SVGIcon} from 'components/common';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
    </Menu.Item>
  </Menu>
);


export default class AppHeader extends Component{
    render(){
        return (
            <Header className="header clearfix">
              <div className="logo">
                <Link to="home?tabKey=home&title=首页">
                    <SVGIcon className="logo-icon" icon="#icon-maotouying" />
                    <span>React</span>
                </Link>
              </div>
              <div className="site-link">
                <a><Icon type="bell" />消息下载</a>
                <a><Icon type="download" />产品下载</a>
                <a><Icon type="question-circle" />帮助中心</a>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                    移动版 <Icon type="down" />
                  </a>
                </Dropdown>
              </div>
          </Header>
        )
    }
}