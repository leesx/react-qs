/*
 * @Author: leesx 
 * @Date: 2017-07-06 14:07:23 
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-06 17:09:13
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import {SVGIcon} from 'components/common'

export default function Home(props) {
    return (
        <div className="home-page">
            <div className="home-hd">
                <h4>北京动物园</h4>
            </div>
            <div className="home-bd">
                <div className="icon-lists">
                    <SVGIcon icon="#icon-ciwei"/>
                    <SVGIcon icon="#icon-xiaoji"/>
                    <SVGIcon icon="#icon-huli"/>
                    <SVGIcon icon="#icon-gongji"/>
                    <SVGIcon icon="#icon-jingyu"/>
                    <SVGIcon icon="#icon-huhou"/>
                    <SVGIcon icon="#icon-nainiu"/>
                    <SVGIcon icon="#icon-kaola"/>
                    <SVGIcon icon="#icon-lu"/>
                    <SVGIcon icon="#icon-hema"/>
                    <SVGIcon icon="#icon-pangxie"/>
                    <SVGIcon icon="#icon-xiongmao"/>
                </div>
            </div>
            <div className="home-hd">
                <h4>外卖动物园</h4>
            </div>
            <div className="home-bd">
                <ul className="waimai-logo clearfix">
                    <li>
                        <Link>
                            <img className="bind-wm" src={require("assets/img/waimai_homepage_image_meituan.png")}/>
                        </Link>
                        <h4>美团</h4>
                    </li>
                    <li>
                        <Link>
                            <img className="bind-wm" src={require("assets/img/waimai_homepage_image_eleme.png")}/>
                        </Link>
                        <h4>饿了么</h4>
                    </li>
                    <li>
                        <Link>
                            <img className="bind-wm" src={require('assets/img/waimai_homepage_image_baidu.png')}/>
                        </Link>
                        <h4>百度</h4>
                    </li>

                </ul>
            </div>
        </div>
    )
}