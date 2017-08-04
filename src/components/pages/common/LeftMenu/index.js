/*
 * @Author: leesx 
 * @Date: 2017-07-06 15:47:25 
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-07 15:27:22
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import menuConfig from 'utils/menuConfig';
import {Menu, Icon} from 'antd';
const {SubMenu} = Menu;



function createMenuTree(cfg) {
    //console.log(cfg)
    return cfg.map((item, index) => {
        if (item.children) {
            return (

                <SubMenu key={item.key}
                         title={<span><Icon type={item.icon}/><span className="nav-text">{item.title}</span></span>}>

                    { createMenuTree(item.children) }
                </SubMenu>

            )
        } else {
            return (
                <Menu.Item key={`${item.path}_${index}`}>

                    {
                        item.icon ?
                            <Link to={{pathname: `/${item.path}`, query: {tabKey: item.key, title: item.title}}}>
                            <span>
                                <Icon type={item.icon}/>
                                <span className="nav-text">{item.title}</span>
                            </span>
                            </Link> :
                            <Link to={{
                                pathname: `/${item.path}`,
                                query   : {tabKey: item.key, title: item.title}
                            }}>{item.title}</Link>
                    }
                </Menu.Item>
            )
        }

    })
}


export default function LeftMenu(props) {
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['bindshop_0']}
            defaultOpenKeys={['sub1']}
            style={{height: '100%', borderRight: 0}}
        >

            {createMenuTree(menuConfig)}
        </Menu>
    )
}


