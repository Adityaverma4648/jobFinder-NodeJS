const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Education = require('../model/Education');


router.post('/',async (req,res)=>{
        const { course , yearOfCompletion  , percentage  } = req.body;
        const userEmail = req.cookies.UserEmail;
        if(!userEmail || !course || !yearOfCompletion || !percentage){
         res.status(400);
         throw new Error("Fill all the entries!");
        }
        const education = await Education.create({
            userEmail,
            course,
            yearOfCompletion,
            percentage
        })
        if(education){
           res.status(200).redirect('resume');  
        }else{
           res.status(200).redirect('UserError');
        }
})

router.get(`/delete/:id`, async(req,res)=>{
    var curr_id = req.params.id;
    var idLength = curr_id.length;
    var id = curr_id.slice(1,idLength);
    const deleteQuery = await Education.deleteOne({"_id" : id});
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

  const updateQuery = await Education.updateOne({"_id" : id},{
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