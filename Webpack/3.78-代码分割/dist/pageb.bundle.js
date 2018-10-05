webpackJsonp([4],{

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
// require.include('./modulea')


const page = 'subPageb'

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
        console.log('pageb-subpageb')
        console.log(b)
    })
}


// require.ensure(['lodash'],function() {
//     var _ = require('lodash')
//     _.join(['1','2'],'3')
// },'vendor')


/* harmony default export */ __webpack_exports__["default"] = ('pageb');

/***/ })

},[6]);