const mongoose = require('mongoose');
const porjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectImg:{
        type: String,
        required: true
    },
    projectLink: {
        type: String
    },
    liveSiteLink: {
        type: String
    }
})
const Project = mongoose.model('Project', porjectSchema)

module.exports = Project;