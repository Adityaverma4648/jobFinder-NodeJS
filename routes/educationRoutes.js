const express = require('express');
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

router.post(`/fetchAll`,async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const allEducation = await Education.find({ userEmail});
  if(allEducation){
       res.send(allEducation);
  }else{
      res.status(400)
      throw new Error("CouldNot Fetch From DB");
  }
})


module.exports = router;