const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

// Define Paths for Express Config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather Apps',
        name: 'Mohamad Muqiit'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohamad Muqiit'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        help: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex consequatur provident et veritatis consectetur cupiditate magnam, ad, obcaecati laudantium explicabo cum voluptate, laboriosam quia ipsa error ea? Nisi, officia consequuntur?'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error: error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error})
            }
            return res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help Article is not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: '404 Page Not Found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})