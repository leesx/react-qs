/*
 * @Author: leesx 
 * @Date: 2017-07-06 11:03:35 
 * @Last Modified by:   leesx 
 * @Last Modified time: 2017-07-06 11:03:35 
 */

import React, { Component } from 'react';
import {SVGIcon} from 'components/common';

export default class Demo2 extends Component{
    render(){
        return (
            <div>
                <h1>Demo2</h1>

                <div className="icon-lists">

                    <SVGIcon icon="#icon-laohu" />
                    <SVGIcon icon="#icon-jingyu" />


                </div>
            </div>
        )
    }
}