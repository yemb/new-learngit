import common from  './css/common.less'
import base from './css/base.less'
// window.$ = require("jquery");

var app = document.getElementById('app');
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)

$('#app').addClass('new')

// var api = 'https://m.weibo.cn/api/comments/show'
// $.get('/api/comments/show',{
//     id: 4193586758833502,
//     page: 1
// },function(data) {
//     console.log(data)
// })
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
