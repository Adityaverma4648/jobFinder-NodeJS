const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Jobs = require('../model/Jobs');

router.post('/',async (req,res)=>{
  const {jobName , beginningYear  , yearOfCompletion , role }  = req.body;
  const userEmail = req.cookies.UserEmail;
  if( !userEmail || !jobName || !beginningYear || !yearOfCompletion || !role){
       res.status(400);
       throw new Error("Fill all the entries!");
   }

   const jobs = await Jobs.create({
     userEmail,
     jobName,
     beginningYear,
     yearOfCompletion,
     role
   })
   if(jobs){
         res.status(200).redirect('resume');
   }else{
         res.status(200).redirect('UserError');
   }
})

router.get(`/delete/:id`, async(req,res)=>{
    var curr_id = req.params.id;
    var idLength = curr_id.length;
    var id = curr_id.slice(1,idLength);
    const deleteQuery = await Jobs.deleteOne({"_id" : id});
    if(deleteQuery){
      res.status(200).redirect('http://localhost:7000/resume');
    }else{
      res.status(200).redirect('http://localhost:7000/UserError');
    }
})

router.post(`/fetchAll`,async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const jobs = await Jobs.find({ userEmail});
  if(jobs){
       res.send(jobs);
  }else{
      res.status(400)
      throw new Error("CouldNot Fetch From DB");
  }
})


module.exports = router;