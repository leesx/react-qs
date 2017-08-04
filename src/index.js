import React from 'react';
import ReactDOM  from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router';

//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import "babel-polyfill";


import 'assets/style/app.less'

import App from 'components/App';

import Home from 'components/pages/common/Home';

//DEMO
import Demo1 from 'components/pages/bindDemo/Demo1';
import Demo2 from 'components/pages/bindDemo/Demo2';
import Demo3 from 'components/pages/bindDemo/Demo3';



//性能调优工具
//import ReactPerfTool from 'react-perf-tool';
//import 'react-perf-tool/lib/styles.css';
if (process.env.NODE_ENV === 'development') {
    window.Perf = require('react-addons-perf');
}

//无状态组件
// function App(props){
//   return (
//     <div>
//         {React.cloneElement(props.children, {
//                 key: props.location.pathname
//         })}

//     </div>
//   )
// }


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/home"/>
            <Route path="home" component={Home}/>
            <Route path="/binddemo">
                <Route path="demo1" component={Demo1}/>
                <Route path="demo2" component={Demo2}/>
                <Route path="demo3" component={Demo3}/>
            </Route>

        </Route>
    </Router>
), document.getElementById('root'))
