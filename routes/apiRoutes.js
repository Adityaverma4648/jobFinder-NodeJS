const express = require('express');
const router  = express.Router();
const jobData = require('../data/data.js')


router.post('/',(req,res)=>{
    res.send(jobData);
})

module.exports = router;