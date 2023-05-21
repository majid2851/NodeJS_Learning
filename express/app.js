const exp = require('constants')
const express=require('express')
const morgan=require('morgan')
const fs=require('fs')
const { nextTick } = require('process')

const app=express()

//1)-MiddleWare
 
const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)
app.use(morgan('dev'))
app.use(express.json())
app.use((req,res,next)=>{
    console.log('this is MiddleWare')
    next()
})
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString()
    next()
})

//Route Handlers--------------------------------------------------------------

const getAllTours=(req,res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        status:'sucess',
        requestedAt:req.requestTime,
        result:tours.length,
        data:{
            tours
        }
    })
}
const getTour=(req,res)=>{
    //for having optional value we use ? =>/:id?
    console.log(req.params)
    const id=req.params.id * 1

    const tour=tours.find(el =>el.id===id)

    if(!tour){
        return res.status(404).json({
            status:'Failed',
            messsage:'Invalid Id'
        })
    }
    res.status(200).json({
        status:'sucess', 
        data:{
            'tours':tour
        }
    })
}
const createTour=(req,res)=>{
    // console.log(req.body)
    const newId=tours[tours.length-1].id+1
    const newTour=Object.assign({id:newId},req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),err=>{
        res.status(201).json(
            {
                status:'Success',
                data:{
                    tour:newTour
                }
            }
        )
    })
}
const updateTour=(req,res)=>{
    if(req.params.id * 1 > tours.length)
    {
        return res.status(404).json({
            status:'Failed',
            messsage:'Invalid Id'
        })
    }

    res.status(200).json(
        {
            status:'success',
            data:{
                tours:'<Updated tour here...>'
            }
        }
    )
}

const deleteTour=(req,res)=>{
    if(req.params.id * 1 > tours.length)
    {
        return res.status(404).json({
            status:'Failed',
            messsage:'Invalid Id'
        })
    }

    res.status(204).json(
        {
            status:'success',
            data:null   
        }
    )
}
//----------------------------------------------------------
// app.patch('/api/v1/tours/:id',updateTour)
// app.get('/api/v1/tours',getAllTours)
// app.get('/api/v1/tours/:id',getTour)
// app.post('/api/v1/tours',createTour)
// app.delete('/api/v1/tours/:id',deleteTour)
//----------------------------------------------------------
//Route

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.route('/api/v1/tours/:id')
    .get(getTour)
    .delete(deleteTour)
    .patch(updateTour)

//Start Server    
const port=3000
app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})


