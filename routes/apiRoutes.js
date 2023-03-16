const express = require('express');
const router  = express.Router();
const jobData = require('../data/jobData.json');
const collegeList = require('../data/college.json');

router.get('/collegeList',(req,res)=>{
    res.send(collegeList);
})

router.post('/',(req,res)=>{
    res.send(jobData);
})

router.post(`/:id`,(req,res)=>{
        var curr_id = req.params.id;
        var strippedCurrId = curr_id.replace(/[^\d.-]/g,'')
        res.send(jobData[strippedCurrId-1]);
})


module.exports = router;