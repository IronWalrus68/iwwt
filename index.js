const express = require('express')
const app = express()
const path = require('path')
const Project = require('./models/projects');
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    const title = "Home 🏠"
    res.render('home', {title })
})

app.get('/Projects', async (req, res) => {
    const title = "Projects 🗄️"
    const pData = await Project.find({})
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

app.get('/projects/index', async (req, res) => {
    const projectData = await Project.find({})
    res.render('projects/indexProject', {projectData})
})

app.get('/projects/new', (req, res) =>{
    res.render('projects/newProject')
})

app.post('/projects', async (req, res) => {
    const { password } = req.body; 
    if(password === 'password'){
    const newProject = new Project(req.body);
    await newProject.save()
    res.redirect('projects/index')
    } else {res.send('Password is incorrect.');}
})

app.get('/projects/:id/edit', async(req, res) => {
    const {id} = req.params;
    const projectData = await Project.findById(id)
    console.log(projectData)
    console.log(projectData.isHighLighted)
    res.render('projects/editProject', {projectData})
})

app.put('/projects/:id', async(req, res) => {
    const { password } = req.body; 
    if(password === 'password'){
    const {id} = req.params;
    const update = await Project.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect('/projects/index')
    } else {res.send('Password is incorrect.');}
})

app.delete('/projects/:id', async(req, res)=>{
    const { password } = req.body; 
    if(password === 'password'){
    const {id} = req.params;
   const deletedProjects = await Project.findByIdAndDelete(id)
    res.redirect('/projects/index')
    } else {res.send('Password is incorrect.');}
})

// keep this at the bottom
app.listen(3000, ()  => {
    console.log('listening on port 3000')
})