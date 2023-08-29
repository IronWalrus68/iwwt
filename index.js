const express = require('express')
const app = express()
const path = require('path')
const projectsData = require('./projectsData.json')
const privateKeys = require('./privateKeys')
let potdApiData;

app.use(express.static(path.join(__dirname, 'public')))

app.use('/fonts', express.static(path.join(__dirname, 'node_modules', 'Poppins')));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    const title = "Home 🏠"
    res.render('home', {title })
})
app.get('/Projects', (req, res) => {
    const title = "Projects 🗄️"
    const pData = projectsData
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
// data




// keep this at the bottom
app.listen(3000, ()  => {
    console.log('listening on port 3000')
})