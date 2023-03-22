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

router.get(`/update/:id`, async(req,res)=>{
  var curr_id = req.params.id;
  var idLength = curr_id.length;
  var id = curr_id.slice(1,idLength);

  const { course , yearOfCompletion  , percentage  } = req.body;
        const userEmail = req.cookies.UserEmail;
        if(!userEmail || !course || !yearOfCompletion || !percentage){
         res.status(400);
         throw new Error("Fill all the entries!");
        }

  const updateQuery = await Jobs.updateOne({"_id" : id},{
       $set : {
         userEmail : userEmail,
         course : course,
         yearOfCompletion : yearOfCompletion,
         percentage : percentage,
       }
  })
  if(updateQuery){
    res.status(200).redirect("https://localhost:7000/resume");
  }else{
    res.status(200).redirect('http://localhost:7000/UserError');
  }
})

module.exports = router;