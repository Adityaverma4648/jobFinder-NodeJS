const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Responsibility = require('../model/Responsibility');

router.post('/',async (req,res)=>{
    const { responsibility , role }  = req.body;
    const userEmail = req.cookies.UserEmail;
    if( !userEmail || !responsibility || !role){
         res.status(400);
         throw new Error("Fill all the entries!");
     }
  
     const myResponsibility = await Responsibility.create({
       userEmail,
       responsibility,
       role
     })
     if(myResponsibility){
           res.status(200).redirect('resume');
     }else{
           res.status(200).redirect('UserError');
     }
  
})

router.get(`/delete/:id`, async(req,res)=>{
    var curr_id = req.params.id;
    var idLength = curr_id.length;
    var id = curr_id.slice(1,idLength);
    const deleteQuery = await Responsibility.deleteOne({"_id" : id});
    if(deleteQuery){
      res.status(200).redirect('http://localhost:7000/resume');
    }else{
      res.status(200).redirect('http://localhost:7000/UserError');
    }
})


router.post(`/fetchAll`,async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const responsibility = await Responsibility.find({ userEmail});
  if(responsibility){
       res.send(responsibility);
  }else{
      res.status(400)
      throw new Error("CouldNot Fetch From DB");
  }
})


module.exports = router;