/*
 * @Author: leesx 
 * @Date: 2017-07-06 11:02:50 
 * @Last Modified by:   leesx 
 * @Last Modified time: 2017-07-06 11:02:50 
 */


import React,{ Component } from 'react'
import { Layout, Menu, Icon, Dropdown } from 'antd';

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

export default class UserMenu extends Component{
    render(){
        return (
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    user name<Icon type="down" />
                </a>
            </Dropdown>
        )
    }
}