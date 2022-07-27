const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors')
const RecruitModel = require('./models/Recruits')

app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

mongoose.connect("mongodb+srv://admin:75GgT1Tyi68ioJnb@cluster0.bzvpalw.mongodb.net/candetect?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post('/insert', async (req, response) => {

    const college_name = req.body.college_name
    const company_names = req.body.college_name
    const degree = req.body.college_name
    const designation = req.body.college_name
    const email = req.body.college_name
    const experience = req.body.college_name
    const mobile_number = req.body.college_name
    const name = req.body.college_name
    const no_of_pages = req.body.college_name
    const skills = req.body.college_name
    const total_experience = req.body.total_experience

    axios.get('http://localhost:3000/details').then(async (res) => {
        const recruit = new RecruitModel({college_name:res.data.college_name, company_names:res.data.company_names,
            degree:res.data.degree, designation:res.data.designation,
            email:res.data.email, experience:res.data.experience,
            mobile_number:res.data.mobile_number, name:res.data.name,
            no_of_pages:res.data.no_of_pages, skills:res.data.skills,
            total_experience:res.data.total_experience});
        await recruit.save()
        response.send("inserted data")
      });
});

app.get('/read', async (req, res) => {
    RecruitModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    });
});
app.listen(8080, () => {
    console.log(`Server running on port 8080`)
});