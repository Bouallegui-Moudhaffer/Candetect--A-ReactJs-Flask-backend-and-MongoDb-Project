const mongoose = require('mongoose')

const RecruitSchema = new mongoose.Schema({
    college_name:{
        type: String,
        required: false,
    },
    company_names:{
        type: [String],
        required: false,
    },
    degree:{
        type: [String],
        required: false,
    },
    designation:{
        type: [String],
        required: false,
    },
    email:{
        type: String,
        required: false,
    },
    experience:{
        type: [String],
        required: false,
    },
    mobile_number:{
        type: String,
        required: false,
    },
    name:{
        type: String,
        required: false,
    },
    no_of_pages:{
        type: String,
        required: false,
    },
    skills:{
        type: [String],
        required: false,
    },
    total_experience:{
        type: String,
        required: false,
    },
})  

const Recruit = mongoose.model("recruits", RecruitSchema)
module.exports = Recruit