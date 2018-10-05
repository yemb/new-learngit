import common from  './css/common.less'
import base from './css/base.less'

var app = document.getElementById('app');
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)

import {a} from './common/util'
console.log(a())
// import {chunk} from 'lodash'
// console.log(chunk([1,2,3,4,5],2))

// import(/*webpackChunkName:'a'*/'./components/a').then((a)=>{
//     console.log(a)
// })


//++++++++++++++++++++++++++     style-loader/useable的使用demo
// var flag = false
// setInterval(()=>{
//     if(flag) {
//         base.unuse()
//     }else {
//         base.use()
//     }
//     flag = !flag
// },1000)