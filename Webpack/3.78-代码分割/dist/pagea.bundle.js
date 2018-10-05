webpackJsonp([5],{

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// require.include('./modulea')


const page = 'subPagea'

// *********************   require.ensure *******************
// if(page === 'subPagea') {
//     require.ensure(['./subPagea'],function() {
//         var subPagea = require('./subPagea')
//     },'subpagea')
// }else {  
//     require.ensure(['./subPageb'],function() {
//         var subPageb = require('./subPageb')
//     },'subpageb')
// }

// *********************  import().then() *******************
if(page === 'subPagea') {
    Promise.all/* import() */([__webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, 1)).then((a)=>{
        console.log('pagea-subpagea')
        console.log(a)
    })
}else {  
    Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, 2)).then((b)=>{
        console.log('pagea-subpageb')
        console.log(b)
    })
}



// import * as _ from 'lodash'
new Promise(function(resolve) { resolve(); }).then((function() {
    var _ = __webpack_require__(0)
    _.join(['1','2'],'3')
}).bind(null, __webpack_require__)).catch(__webpack_require__.oe)


/* harmony default export */ __webpack_exports__["default"] = ('pagea');

/***/ })

},[3]);