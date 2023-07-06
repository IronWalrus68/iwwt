const express = require('express')
const app = express()
const path = require('path')
const projectsData = require('./projectsData.json')

app.use(express.static(path.join(__dirname, 'public')))

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









// keep this at the bottom
app.listen(3000, ()  => {
    console.log('listening on port 3000')
})