const express = require('express');
const mongoose = require('mongoose');
const Jobs = require('../model/Jobs');
const router  = express.Router();
const jobData = require('../data/jobData.json');
const collegeList = require('../data/college.json');
const educationRoutes = require('../routes/educationRoutes');
const { log } = require('handlebars');

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


router.get('/trending',async (req,res)=>{

    function getRandomElements(array, count) {
        const shuffled = array.slice(); // Create a shallow copy of the original array.
        let i = array.length;
        const min = i - count;
        while (i-- > min) {
          const index = Math.floor((i + 1) * Math.random());
          [shuffled[i], shuffled[index]] = [shuffled[index], shuffled[i]];
        }
        return shuffled.slice(min);
      }

      const randomElements = getRandomElements(jobData, 20);
      res.status(200).send(randomElements);

})


module.exports = router;