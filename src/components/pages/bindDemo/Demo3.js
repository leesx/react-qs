/*
 * @Author: leesx 
 * @Date: 2017-07-06 11:03:35
 * @Last Modified by:   leesx
 * @Last Modified time: 2017-07-06 11:03:35
 */

import React, { Component } from 'react';
import {SVGIcon} from 'components/common';

export default class Demo3 extends Component{
    render(){
        return (
            <div>
                <h1>Demo3</h1>
                <div className="icon-lists">
                    <SVGIcon icon="#icon-ciwei" />
                    <SVGIcon icon="#icon-xiaoji" />
                    <SVGIcon icon="#icon-huli" />
                    <SVGIcon icon="#icon-gongji" />
                </div>


            </div>
        )
    }
}