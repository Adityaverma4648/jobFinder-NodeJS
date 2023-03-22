const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Projects = require('../model/Projects');


router.post("/", async (req,res) => {
    const { projectName , projectDescription , projectLink }  = req.body;
    const userEmail = req.cookies.UserEmail;
    if( !userEmail || !projectName || !projectDescription || !projectLink){
         res.status(400);
         throw new Error("Fill all the entries!");
     }
  
     const projects = await Projects.create({
       userEmail,
       projectName,
       projectDescription,
       projectLink,
     })
     if(projects){
           res.status(200).redirect('resume');
     }else{
           res.status(200).redirect('UserError');
     }
  
  })

  router.get(`/delete/:id`, async(req,res)=>{
      var curr_id = req.params.id;
      var idLength = curr_id.length;
      var id = curr_id.slice(1,idLength);
      const deleteQuery = await Projects.deleteOne({"_id" : id});
      if(deleteQuery){
        res.status(200).redirect('http://localhost:7000/resume');
      }else{
        res.status(200).redirect('http://localhost:7000/UserError');
      }
  })
  
router.post(`/fetchAll`,async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const projects = await Projects.find({ userEmail});
  if(projects){
       res.send(projects);
  }else{
      res.status(400)
      throw new Error("CouldNot Fetch From DB");
  }
})

  module.exports = router;