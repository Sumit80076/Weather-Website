const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forcast=require('./utils/forcast')

const app=express()

// Define paths for Express config
const publicDirpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('views', viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialspath)

// setup static directory to server
app.use(express.static(publicDirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Sumit Pawar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Sumit Pawar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Sumit Pawar'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    forcast(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forcast: data,
            address: req.query.address
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[] 
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Sumit Pawar',
        errorMessage: 'Help article not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Sumit Pawar',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})

