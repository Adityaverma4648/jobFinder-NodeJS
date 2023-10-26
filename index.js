require("dotenv").config();
const express = require('express');
const hbs = require('hbs');
const path =  require('path');
const jobData = require("./data/JobData.json");
const apiRoutes = require('./routes/apiRoutes');
const generateToken = require("./config/Jwt");
const educationRoutes = require("./routes/educationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const responsibilityRoutes = require("./routes/responsibilityRoutes");
const projectRoutes = require("./routes/projectRoutes");
const worksRoutes = require("./routes/workRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const location = require('./data/Location.json');

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
const PORT = process.env.PORT||7000;

//  path to static directory-----------------------------------------------------------------------------------------------------------------------------------------
const staticPath  = path.join(__dirname, './public');
//  using css in my files - css import

app.use(express.static(staticPath));
app.use(express.static('images'))
// --------------------------------------------------------------------------

//  handle bars template engine - dynamic sites are served.............................. --------------------------------------------------------------------------------
//   engine set to hbs it may be pug,handlebars
app.set('view engine','hbs');

//  rendering partials - compoenents in node js 
const partials = path.join(__dirname,'./views/partials');
hbs.registerPartials(partials);

//  block ends here-----------------------------------------------------------------------------

app.get("/location",(req,res)=>{
  res.send(location);
})

// https://www.youtube.com/shorts/VTw2cUVFl1c
app.get("/",(req,res)=>{
    res.render('index.hbs')
})

app.get("/login",(req,res)=>{
    res.render('login.hbs')
})


app.get("/signUp",(req,res)=>{
    res.render('signUp.hbs')
});

app.get("/internships",(req,res)=>{
  res.render('internships.hbs')
})

app.get("/profile",(req,res)=>{
    res.render('profile.hbs');
})

app.get("/resume",(req,res)=>{
  res.render('resume.hbs')
})

app.get("/upgrade",(req,res)=>{
  res.render('upgrade.hbs')
})

app.get("/opportunity",(req,res)=>{
  res.render('addOpportunity.hbs')
})


app.get("/messages",(req,res)=>{
  res.render('messages.hbs')
})

app.get("/userError",(req,res)=>{
    res.render('UserError');
})

app.get("/applied",(req,res)=>{
    res.render("applied");
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
//  works  --------------------------------------------------------------------------------------------------------------------
app.use('/works',worksRoutes)
//  end block ends here--------------------------------------------------------------------------------------------------------------
//  opportunity  --------------------------------------------------------------------------------------------------------------------
app.use('/opportunity',opportunityRoutes)
//  end block ends here--------------------------------------------------------------------------------------------------------------































//  user controller - post data gathering-- -- -- -- -- -- -- -- -- -- -- -- -- -- 
app.post("/signUp", async (req,res)=>{
    const {userName, email, designation , password} = req.body;

    if(!userName || !email || !designation || !password){
        res.status(400).json({message : "Fill all the entries!"});
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(200).json({message : "User Already Exists"});
    }
    const user = await User.create({
        userName,
        email,
        designation,
        password,
      });
    
      if (user) {
        res.status(201).json({message : "Successfully Signed Up!"});
      } else {
        res.status(400).json({message : "User not found"});
      }

});


//  Login  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/login",(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token  = generateToken(user._id);
    const userData  = await User.find({email});
    res.status(200).json({message : "Successfully Logged In!", data : userData, token : token});
  } else {
    res.status(200).json({message : "Login Failed!"})
  }
}))


//  Logout--------------------------------------------------------------------------------------------------------------

app.get('/logout', (req, res) => {
  return res.status(200).json({message : "Successfully Logged Out!"});
});

//  Block ends here---------------------------------------------------------------------------------------------------------------

//   View more Url-----------------------------------------------------------------------------------------------------------------
jobData?.forEach((d) => { 
   var _id = d.id;
   app.get(`/viewMore:${_id}`,(req,res)=>{
        res.render('viewMore.hbs')
    })

    app.get(`/apply:${_id}`,(req,res)=>{
      res.render('Apply');
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


