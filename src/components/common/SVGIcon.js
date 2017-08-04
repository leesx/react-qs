/**
 * Created by leesx on 2017/8/4.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
function SVGIcon(props) {
    const cls = classnames({
        'icon':true,
        [props.className]:true
    })
    const useTag = `<use xlink:href="${props.icon}"></use>`;
    return <svg  className={cls} aria-hidden="true" dangerouslySetInnerHTML={{__html: useTag }} />;
}
export default SVGIcon