const express = require('express');
const router  = express.Router();
const jobData = require('../data/jobData.json')


router.post('/',(req,res)=>{
    res.send(jobData);
})


router.get(`/:id`,(req,res)=>{
        var curr_id = req.params.id;
        var strippedCurrId = curr_id.replace(/[^\d.-]/g,'')
        res.send(jobData[strippedCurrId-1]);
})


module.exports = router;