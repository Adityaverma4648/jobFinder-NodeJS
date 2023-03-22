const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Internships = require('../model/Internships');


router.post("/", async (req,res) => {
    const {internshipName , beginningMonth  , monthOfCompletion , yearOfCompletion , role }  = req.body;
    const userEmail = req.cookies.UserEmail;
    if( !userEmail || !internshipName || !beginningMonth || !monthOfCompletion  || !yearOfCompletion || !role){
         res.status(400);
         throw new Error("Fill all the entries!");
     }
  
     const internship = await Internships.create({
       userEmail,
       internshipName,
       beginningMonth,
       monthOfCompletion,
       yearOfCompletion,
       role
     })
     if(internship){
           res.status(200).redirect('resume');
     }else{
           res.status(200).redirect('UserError');
     }
  })

  router.get(`/delete/:id`, async(req,res)=>{
    var curr_id = req.params.id;
    var idLength = curr_id.length;
    var id = curr_id.slice(1,idLength);
    const deleteQuery = await Internships.deleteOne({"_id" : id});
    if(deleteQuery){
      res.status(200).redirect('http://localhost:7000/resume');
    }else{
      res.status(200).redirect('http://localhost:7000/UserError');
    }
})


router.post(`/fetchAll`,async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const internship = await Internships.find({ userEmail});
  if(internship){
       res.send(internship);
  }else{
      res.status(400)
      throw new Error("CouldNot Fetch From DB");
  }
})


  module.exports = router;