require("dotenv").config();
const express = require('express');
const hbs = require('hbs');
const path =  require('path');
const apiRoutes = require('./routes/apiRoutes');
const jobData = require('./data/JobData.json')
const collegeList = require('./data/college.json');
const generateToken = require("./config/Jwt");

//  calling mongo models

const User = require("./model/User");
const companyUser = require("./model/CompanyUser");

// ------------------------------------------------------------------------------------------------------------------------------------------



// express instance
const app = express();
app.use(express.json()); // to accept json data
app.use(express.urlencoded({extended:false}));
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
//  user controller - post data gathering-- -- -- -- -- -- -- -- -- -- -- -- -- -- 
app.post("/signUp", async (req,res)=>{
    const {firstName, lastName, email, college, password} = req.body;

    if(!firstName || !lastName || !email || !college || !password){
        res.status(400);
        throw new Error("Please Enter All Fields");
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
        firstName,
        lastName,
        email,
        college,
        password,
      });
    
      if (user) {
        res.status(201).redirect('login')
        //  redirected on login 
      } else {
        res.status(400);
        throw new Error("User not found");
      }

});

app.get("/companySignUp",(req,res)=>{
    res.render('companySignUp.hbs')
})
// company user controller - post data gathering-- -- -- -- -- -- -- -- -- -- -- -- -- -- 
app.post("/companySignUp", async (req,res)=>{
    const {companyName, companyAddress  , email, password} = req.body;

    if(!companyName || !companyAddress || !email || !password){
        res.status(400);
        throw new Error("Please Enter All Fields");
    }
    const userExists = await companyUser.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const company = await companyUser.create({
        companyName,
        companyAddress,
        email,
        password,
      });
    
      if (company) {
        res.status(201).redirect('login')
        //  redirected on login 
      } else {
        res.status(400);
        throw new Error("Company User Not Found");
      }

});



//  LOGIN

app.post("/login",(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).redirect('/');
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
}))

app.get("/companyLogin",(req,res)=>{
     res.render("companyLogin.hbs");
})

app.post("/companyLogin",async(req,res)=>{
    const {email,password} = req.body;

    const company = await companyUser.findOne({email});

    if(company && (await company.matchPassword(password))){
        res.status(200).redirect('/');
    }
})

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


