const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    const title = "Home 🏠"
    res.render('home', {title })
})
app.get('/Projects', (req, res) => {
    const title = "Projects 🗄️"
    const projects = ['project1', 'project2', 'project3']
    res.render('Projects', {title, projects})
})








// keep this at the bottom
app.listen(3000, ()  => {
    console.log('listening on port 3000')
})