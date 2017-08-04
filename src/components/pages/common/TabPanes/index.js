/*
 * @Author: leesx 
 * @Date: 2017-07-06 11:02:44 
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-07 15:08:06
 */

import React, {Component} from 'react'
import {uniqBy} from 'lodash'
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

import Home from './../Home'
export default class TabPanes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panes: [{
                title   : '首页',
                key     : 'home',
                content : <Home />,
                closable: false,
            }],
        };
    }


    componentDidMount() {
        this.setState({activeKey: this.props.tabActiveKey});
    }

    componentWillReceiveProps(nextProps) {

        const {panes}                   = this.state;
        const {panesItem, tabActiveKey} = nextProps

        if (panes.findIndex(item => item.key === panesItem.key) > -1) {
            this.setState({
                activeKey: tabActiveKey,
            })
            return false;
        }
        panes.push(panesItem)
        this.setState({panes, activeKey: tabActiveKey});

    }

    onChange = (activeKey) => {

        this.setState({activeKey});
    }
    onEdit   = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        const {panes}  = this.state
        const delIndex = panes.findIndex((item) => item.key === targetKey)
        let nextKey

        panes.splice(delIndex, 1)
        console.log(panes, delIndex)
        if (delIndex > 0) {
            nextKey = panes[delIndex - 1].key
        } else if (delIndex === 0 && panes.length) {
            nextKey = panes[delIndex].key
        }
        this.setState({panes, activeKey: nextKey});

    }

    render() {
        return (
            <div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    defaultActiveKey={this.props.defaultActiveKey}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}

                >
                    {
                        this.state.panes.map(pane => {
                            return (
                                <TabPane tab={pane.title} closable={pane.closable} key={pane.key}>
                                    {pane.content}
                                </TabPane>
                            )
                        })
                    }
                </Tabs>
            </div>
        );
    }
}
