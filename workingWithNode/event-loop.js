const fs=require('fs')
const crypto=require("crypto")
const start=Date.now()
process.env.UV_THREADPOOL_SIZE=3


setTimeout(() => {
    console.log('Timer 1 is Finished')
}, 0);

setImmediate(()=>console.log('Immediate 1 finished'))

fs.readFile('text-file.txt',()=>{
    console.log('I/O is finished')
    console.log('-------------------')

    setTimeout(() => {
          console.log('Timer 2 finished',0)
    }, 0);
    setTimeout(() => {
        console.log('Timer 3 finished',3000)
    })
    setImmediate(()=>{
        console.log('Immediate 2 finished')
    })

    process.nextTick(()=>console.log('Process.NextTick'))

    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted",)
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted",)
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted",)
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted",)
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted",)
    })
    crypto.pbkdf2('password','salt',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,"Password encrypted",)
    })
})

console.log('top level code')




