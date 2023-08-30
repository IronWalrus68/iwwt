const express = require('express')
const app = express()
const path = require('path')
const project = require('./models/projects');
const privateKeys = require('./privateKeys')
let potdApiData;
const mongoose = require('mongoose');
const methodOverride = require('method-override')

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://127.0.0.1:27017/iwwt')
.then(() => {
    console.log('Connection Open')
})
.catch(err => {
    console.log('error connecting')
    console.log(err)
})

app.use('/fonts', express.static(path.join(__dirname, 'node_modules', 'Poppins')));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    const title = "Home 🏠"
    res.render('home', {title })
})

app.get('/Projects', async (req, res) => {
    const title = "Projects 🗄️"
    const pData = await project.find({})
    res.render('Projects', {title, pData})
})

app.get('/info', (req, res) => {
    const title = "info"
    res.render('info', {title})
})

app.get('/potd', async (req, res) => {
    const title = 'Picture of the day'
    if (!potdApiData) potdApiData = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${privateKeys.potdKey}`).then(d => d.json())
    const potdData = potdApiData
    res.render('potd', {title, potdData})
})




// keep this at the bottom
app.listen(3000, ()  => {
    console.log('listening on port 3000')
})