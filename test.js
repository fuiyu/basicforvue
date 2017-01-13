const userModel = require("./model").user

console.log(userModel)
var result = userModel.create({'name':'fuiyu','password':'123'})
// class Foo {
//     async bar() {
//         return Promise.resolve(1)
//     }
    
// }

// const foo = new Foo();
// (async function(){    
//         const bar = await foo.bar()
//         console.log(bar)
// } )()
