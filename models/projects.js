const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
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
    },
    isHighLighted: {
        type: Boolean,
        default: false
    }
})
const Project = mongoose.model('Project', projectSchema)

module.exports = Project;