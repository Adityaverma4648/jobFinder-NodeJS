require("dotenv").config();
const express = require('express');
const hbs = require('hbs');
const path =  require('path');
const apiRoutes = require('./routes/apiRoutes');
const jobData = require('./data/JobData.json')
const generateToken = require("./config/Jwt");
const educationRoutes = require("./routes/educationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const responsibilityRoutes = require("./routes/responsibilityRoutes");
const projectRoutes = require("./routes/projectRoutes");
const worksRoutes = require("./routes/workRoutes");


//  cookie
const cookieParser = require('cookie-parser');
const session = require('express-session');

//  calling mongo models

const User = require("./model/User");
const Education = require("./model/Education");
const Jobs = require("./model/Jobs");
const Internships = require("./model/Internships");
const Responsibility = require("./model/Responsibility");
const Projects = require("./model/Projects");
const Works = require("./model/Works") 
// ------------------------------------------------------------------------------------------------------------------------------------------



// express instance
const app = express();
app.use(express.json()); // to accept json data
app.use(express.urlencoded({extended:false}));


// cookies and session 
app.use(cookieParser())
// Session Setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie : {  },
}))

// DB connect 
const connectDB = require("./config/connect");
// PORT decision
const PORT = process.env.PORT||5000;

//  path to static directory-----------------------------------------------------------------------------------------------------------------------------------------
const staticPath  = path.join(__dirname, './public');
//  using css in my files - css import

app.use(express.static(staticPath));

// --------------------------------------------------------------------------

//  handle bars template engine - dynamic sites are served.............................. --------------------------------------------------------------------------------
//   engine set to hbs it may be pug,handlebars
app.set('view engine','hbs');

//  rendering partials - compoenents in node js 
const partials = path.join(__dirname,'./views/partials');
hbs.registerPartials(partials);

//  block ends here-----------------------------------------------------------------------------


// https://www.youtube.com/shorts/VTw2cUVFl1c
app.get("/",(req,res)=>{
    res.render('index.hbs')
})

app.get("/login",(req,res)=>{
    res.render('login.hbs')
})


app.get("/signUp",(req,res)=>{
    res.render('signUp.hbs')
})

app.get("/profile",(req,res)=>{
    res.render('profile.hbs')
})

app.get("/resume",(req,res)=>{
  res.render('resume.hbs')
})

app.get("/upgrade",(req,res)=>{
  res.render('upgrade.hbs')
})


app.get("/userError",(req,res)=>{
    res.render('UserError');
})










  // Resume------------------------------------------------------------------------------------------------------------------

//  education --------------------------------------------------------------------------------------------------------------------
app.use('/education',educationRoutes)
//  end block ends here--------------------------------------------------------------------------------------------------------------
//  Job --------------------------------------------------------------------------------------------------------------------
app.use('/jobs',jobRoutes)
//  end block ends here--------------------------------------------------------------------------------------------------------------
//  Internship  --------------------------------------------------------------------------------------------------------------------
app.use('/internships',internshipRoutes)
//  end block ends here--------------------------------------------------------------------------------------------------------------
//  Responsibility  --------------------------------------------------------------------------------------------------------------------
app.use('/responsibility',responsibilityRoutes)
//  end block ends here--------------------------------------------------------------------------------------------------------------
//  Projects  --------------------------------------------------------------------------------------------------------------------
app.use('/projects',projectRoutes)
//  end block ends here--------------------------------------------------------------------------------------------------------------
//  Projects  --------------------------------------------------------------------------------------------------------------------
app.use('/works',worksRoutes)
//  end block ends here--------------------------------------------------------------------------------------------------------------


app.post('/allInternships', async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const allInternship = await Internships.find({ userEmail});
  if(allInternship){
       res.send(allInternship);
  }else{
      res.status(400)
      throw new Error("nhi dunga bhai");
  }
})

app.post('/allResponsibility', async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const allResponsibility = await Responsibility.find({ userEmail});
  if(allResponsibility){
       res.send(allResponsibility);
  }else{
      res.status(400)
      throw new Error("nhi dunga bhai");
  }
})

app.post('/allProjects', async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const projects = await Projects.find({ userEmail});
  if(projects){
       res.send(projects);
  }else{
      res.status(400)
      throw new Error("nhi dunga bhai");
  }
})

app.post('/allJobs', async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const allJobs = await Jobs.find({ userEmail});
  if(allJobs){
       res.send(allJobs);
  }else{
      res.status(400)
      throw new Error("nhi dunga bhai");
  }
})

app.post('/allWorks', async (req,res)=>{
  const userEmail = req.cookies.UserEmail;
  const work = await Works.find({ userEmail});
  if(work){
       res.send(work);
  }else{
      res.status(400)
      throw new Error("nhi dunga bhai");
  }
})

































//  user controller - post data gathering-- -- -- -- -- -- -- -- -- -- -- -- -- -- 
app.post("/signUp", async (req,res)=>{
    const {userName, email, designation , password} = req.body;

    if(!userName || !email || !designation || !password){
        res.status(400);
        throw new Error("Fill all the entries!");
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
        userName,
        email,
        designation,
        password,
      });
    
      if (user) {
        res.status(201).redirect('login');
        //  redirected on login 
      } else {
        res.status(400);
        throw new Error("User not found");
      }

});


//  Login  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/login",(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token  = generateToken(user._id);
    const userData  = await User.find({email});
    req.session.userData = userData;
    res.cookie("userDesignation" ,userData[0].designation);
    res.cookie("userName",userData[0].userName);
    res.cookie("token",token);
    res.cookie("UserEmail" , email);
    res.status(200).redirect('/');
  } else {
    res.status(200).redirect('UserError')
  }
}))


//  Logout--------------------------------------------------------------------------------------------------------------

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('UserEmail');
  res.clearCookie('userName');
  res.clearCookie('companyEmail');
  return res.redirect('/');
});

//  Block ends here---------------------------------------------------------------------------------------------------------------

//   View more Url-----------------------------------------------------------------------------------------------------------------
jobData?.forEach((d) => { 
   var _id = d.id;
   app.get(`/viewMore:${_id}`,(req,res)=>{
        res.render('viewMore.hbs')
    })
});
  
//  App api Route-----------------------------------------------------------------------------------------------
app.use('/api',apiRoutes);
// app.use('/user',userRoutes);

const start = async ()=>{
   try {
       await connectDB(process.env.MONGODB_URI);
      app.listen(PORT,console.log(`SERVER STARTED AT ${PORT}`));
   } catch (error) {
       console.log(`Connection failed : ${error}`)
   }

}
start();


