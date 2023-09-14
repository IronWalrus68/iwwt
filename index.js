const express = require('express')
const app = express()
const path = require('path')
const Project = require('./models/projects');
const privateKeys = require('./privateKeys')
let potdApiData;
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const nodemailer = require('nodemailer')
const rateLimit = require("express-rate-limit");

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

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many email requests created from this IP, please try again after 15 minutes"
});

// email form
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: "camsjobhunting@gmail.com",
        pass: privateKeys.gmailKey,
    },
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', async (req, res) => {
    const title = "Home 🏠"
    const pData = await Project.find({})
    res.render('home', { title, pData })
})

app.get('/Projects', async (req, res) => {
    const title = "Projects 🗄️"
    const pData = await Project.find({})
    res.render('Projects', { title, pData })
})

app.get('/info', (req, res) => {
    const title = "info"
    res.render('info', { title })
})

app.get('/potd', async (req, res) => {
    const title = 'Picture of the day'
    if (!potdApiData) potdApiData = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${privateKeys.potdKey}`).then(d => d.json())
    const potdData = potdApiData
    res.render('potd', { title, potdData })
})

app.get('/api', (req, res) => {
    const title = 'API';
    res.render('api', { title })
})
// projects back end api stuffs
app.get('/projects/index', async (req, res) => {
    const projectData = await Project.find({})
    res.render('projects/indexProject', { projectData })
})

app.get('/projects/new', (req, res) => {
    res.render('projects/newProject')
})

app.post('/projects', async (req, res) => {
    const { password } = req.body;
    if (password === 'password') {
        const newProject = new Project(req.body);
        await newProject.save()
        res.redirect('projects/index')
    } else { res.send('Password is incorrect.'); }
})

app.get('/projects/:id/edit', async (req, res) => {
    const { id } = req.params;
    const projectData = await Project.findById(id)
    res.render('projects/editProject', { projectData })
})

app.put('/projects/:id', async (req, res) => {
    const { password } = req.body;
    if (password === 'password') {
        const { id } = req.params;
        const update = await Project.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.redirect('/projects/index')
    } else { res.send('Password is incorrect.'); }
})

app.delete('/projects/:id', async (req, res) => {
    const { password } = req.body;
    if (password === privateKeys.password) {
        const { id } = req.params;
        const deletedProjects = await Project.findByIdAndDelete(id)
        res.redirect('/projects/index')
    } else { res.send('Password is incorrect.'); }
})

app.post('/email', emailLimiter, async (req, res) => {
    try {
        // Check for honeypot
        if (req.body.honeypot) {
            // If honeypot is filled out, it's probably a bot.
            return res.status(400).send("Spam detected.");
        }

        // Extract form data
        const { emailName, emailAddress, emailContent } = req.body;

        console.log(emailName, emailAddress, emailContent)

        // Set up email data
        const mailOptions = {
            from: emailAddress,              // sender address from the form
            to: "camsjobhunting@gmail.com",  // your address
            subject: `Message from ${emailName}`, // Subject line
            text: `response address: ${emailName}, Content: ${emailContent}`,      // plain text body
            // html: "<p>Email Content in HTML if needed</p>", // If you want to send HTML content
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send a response to the client
        res.status(200).redirect("/emailSuccess");
    } catch (error) {
        console.error("Error redirecting email:", error);
        res.status(500).redirect("/emailFail");
    }
});

app.get('/emailSuccess', (req, res) => {
    const title = "Email Success!"
    res.render('emailSentSuccess', { title})
})

app.get('/emailFail', (req, res) => {
    const title = "Email Failed to send :("
    res.render('emailSentFail', { title})
})

// keep this at the bottom
app.listen(3000, () => {
    console.log('listening on port 3000')
})