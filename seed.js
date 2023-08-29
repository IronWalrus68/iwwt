const mongoose = require('mongoose')
const project = require('./models/projects');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(() => {
    console.log('Connection Open')
})
.catch(err => {
    console.log('error connecting')
    console.log(err)
})
const seedProjects = [
    {
        projectName: "TrippleWalrus",
        projectImg: "/images/TrippleWalrus.png",
        projectLink: "https://github.com/IronWalrus68/trippleWalrus",
        liveSiteLink: "https://ironwalrus68.github.io/trippleWalrus/"
    },
    {
        projectName: "Magic8Ball",
        projectImg: "/images/Magic8Ball.png",
        projectLink: "https://github.com/IronWalrus68/Magic8Ball",
        liveSiteLink: "https://ironwalrus68.github.io/Magic8Ball/"
    },
    {
        projectName: "score-keeper",
        projectImg: "/images/score-keeper.png",
        projectLink: "https://github.com/IronWalrus68/score-keeper",
        liveSiteLink: "https://ironwalrus68.github.io/score-keeper/"
    },
    {
        projectName: "tv_api_demo",
        projectImg: "/images/TVmaze_api_Demo.png",
        projectLink: "https://github.com/IronWalrus68/tv_api_demo",
        liveSiteLink: "https://ironwalrus68.github.io/tv_api_demo/"
    },
    {
        projectName: "IWWT-Portoli",
        projectImg: "/images/IWWT-portolio.png",
        projectLink: "https://github.com/IronWalrus68/IWWT-Portfoli",
        liveSiteLink: "https://ironwalrus68.github.io/IWWT-Portfoli/"
    },
    {
        projectName: "skyrim-roulette",
        projectImg: "/images/skyrim-roulette.png",
        projectLink: "https://github.com/IronWalrus68/skyrim-roulette",
        liveSiteLink: "https://ironwalrus68.github.io/skyrim-roulette/"
    },
    {
        projectName: "picture_of_the_day",
        projectImg: "/images/picture_of_the_day.png",
        projectLink: "potd",
        liveSiteLink: "/potd"
    }
]
// project.insertMany(seedProjects)
// .then(p => {
//     console.log(p)
// })
// .catch(e => {
//     console.log(e)
// })
// this has been run, don't need to run again.