console.log(arguments)
console.log(require('module').wrapper)

//modules.exports
const C1 = require('./test-module-1')
const c1=new C1()
console.log(c1.add(4,6))

const {add,multiply,divide}=require('./test-module-2')
console.log(multiply(34,7))

//Caching
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()












