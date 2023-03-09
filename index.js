require("dotenv").config();
const express = require('express');
const hbs = require('hbs');
const path =  require('path');
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/userRoutes');

const jobData = require('./data/JobData.json')

// express instance
const app = express();
// DB connect 
const connectDB = require("./config/connect");
// PORT decision
const PORT = process.env.PORT||5000;


//  path to static directory-----------------------------------------------------------------------------------------------------------------------------------------
const staticPath  = path.join(__dirname, './public');
//  using css in my files - css import

app.use(express.static(staticPath));

// --------------------------------------------------------------------------


//  serving static files using built in middleware;
        //   app.use(express.static(staticPath));
// -------------------------------------------------------------------------------------------------------------------------------------------------


//  handle bars template engine - dynamic sites are served.............................. --------------------------------------------------------------------------------
//   engine set to hbs it may be pug,handlebars
app.set('view engine','hbs');

//  rendering partials - compoenents in node js 
const partials = path.join(__dirname,'./views/partials');
hbs.registerPartials(partials);

//  block ends here-----------------------------------------------------------------------------

app.get("/",(req,res)=>{
    res.render('index.hbs')
})

app.get("/login",(req,res)=>{
    res.render('login.hbs')
})

app.get("/signUp",(req,res)=>{
    res.render('signUp.hbs')
})

jobData?.forEach((d) => { 
   var _id = d.id;
   app.get(`/viewMore:${_id}`,(req,res)=>{
        res.render('viewMore.hbs')
    })
});
  
//  App api Route-----------------------------------------------------------------------------------------------
app.use('/api',apiRoutes);
app.use('/user',userRoutes);




const start = async ()=>{
   try {
       await connectDB(process.env.MONGODB_URI);
      app.listen(PORT,console.log(`SERVER STARTED AT ${PORT}`));
   } catch (error) {
       console.log(`Connection failed : ${error}`)
   }

}
start();


