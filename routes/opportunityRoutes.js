const express = require('express');
const router  = express.Router();
const Opportunity = require('../model/Opportunity');

router.post('/',async (req,res)=>{
  const { companyAddress , role , roleDuration, roleType, dailyRoles , skillsRequired , stipend }  = req.body;
  const companyName = req.cookies.UserName;

  if( !companyName || !roleType || !companyAddress || !roleDuration || !role || !skillsRequired || !dailyRoles || !stipend ){
       res.status(400);
       throw new Error("Fill all the entries!");
   }

   const opportunity = await Opportunity.create({
    companyName,
    companyAddress,
    role,
    roleDuration,
    roleType,
    dailyRoles,
    skillsRequired,
    stipend
   })
   if(opportunity){
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