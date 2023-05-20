const fs=require('fs')
const http=require('http')
const url=require('url')
const replaceTemplate=require('./modules/replaceTemplate')
const slugify=require('slugify')

//---------------------------------------------
//FILES
// //Blocking-synchronous way
// const hello='Haallo'
// console.log(hello)
// const textIn=fs.readFileSync('./txt/input.txt',) 
// const textOut=`this is majid first code in nodejs : ${textIn}\nDate=${Date.now()}`
// fs.writeFileSync('./txt/output.txt',textOut)
// //Non-Blocking-Asynchronous way
// console.log('file is going to be written')
// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     if(err) return console.log('ERROR')

//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2)
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3)
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{

//             })
//         })
//     })
// })
// console.log('file is written')
//--------------------------------------------------------------------------
//Server


const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObject=JSON.parse(data)

const slugs=dataObject.map(el=>slugify(el.productName,{lower:true}))
console.log(slugs)

const server=http.createServer((req,res)=>{
    console.log(req.url)
    console.log(url.parse)
    const { query, pathname: pathName } = url.parse(req.url,true) 
    if(pathName==='/' || pathName==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'}) 

        const cardsHtml=dataObject.map( el => replaceTemplate(tempCard,el)).join('')
        const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        
        res.end(output)
    }else if(pathName==='/product'){
        res.writeHead(200,{'Content-type':'text/html'}) 
        const product = dataObject[query.id]
        const output=replaceTemplate(tempProduct,product)
        res.end(output)
    }else if(pathName==='/api'){
        res.writeHead(200,{'Content-type':'application/json'}) 
        res.end(data)
    }else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-goodMorning'
        })
        res.end('<h1>Page not Found.</h1>')
    }
   
})
server.listen(8000,'127.0.0.1',()=>{
    console.log('Server is Starting......')
})








