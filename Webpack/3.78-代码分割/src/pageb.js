// require.include('./modulea')

import * as _ from 'lodash'
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
    import(/* webpackChunkName:'subpageA' */ './subPagea').then((a)=>{
        console.log('pagea-subpagea')
        console.log(a)
    })
}else {  
    import(/* webpackChunkName:'subpageB' */'./subPageb').then((b)=>{
        console.log('pageb-subpageb')
        console.log(b)
    })
}


// require.ensure(['lodash'],function() {
//     var _ = require('lodash')
//     _.join(['1','2'],'3')
// },'vendor')


export default 'pageb'