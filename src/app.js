const express = require('express');
const path    = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forcast');


const app = express();

const staticPath   = path.join(__dirname, '../public');
const viewsPath    = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');




app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(staticPath));

hbs.registerPartials(partialsPath)

// Routes

app.get('', (req, res) => {
    res.render('index', {
        title: 'The Weather',
        name: '@0en'
    })
});


app.get('/help', (req, res) => {
    res.render('help', {
        name: '@0en'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: '@0en'
    })
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        name: '0en'
    })
})

app.get('/weather', (req,res) => {
    

    if (!req.query.address) {
        return res.send({error: "error"})
    } 

    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({error})
        } 
        
            forecast(latitude, longitude, (error, body) => {
                if (error) {
                    return res.send({error})
                }
               return res.send({
                   forecast: {latitude, longitude},
                   summary: body.summary,
                   currently: body.currently,
                   windSpeed: body.windSpeed,
                   precipProbability: body.precipProbability,
                   daily: body.daily
                   

               });
            })
        
    })
})

app.get('*', (req, res) => {
    
    res.render('404', {
        name: '0en'
    })
})

let port = process.env.PORT || 3000

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {

        console.log(`server on port ${port}`);
    }
});