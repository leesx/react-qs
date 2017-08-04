/*
 * @Author: leesx 
 * @Date: 2017-07-06 11:03:22 
 * @Last Modified by:   leesx 
 * @Last Modified time: 2017-07-06 11:03:22 
 */

import React, {Component} from 'react';
import {SVGIcon} from 'components/common'

console.log(SVGIcon)
export default class Demo1 extends Component {
    render() {
        return (
            <div>
                <h1>Demo1</h1>
                <div className="test-bg"></div>
                <div>
                    <div className="icon-lists clear">

                        <SVGIcon  icon="#icon-xiaoji" />
                        <SVGIcon  icon="#icon-huli" />
                        <SVGIcon  icon="#icon-lang" />

                    </div>

                </div>
            </div>
        )
    }
}